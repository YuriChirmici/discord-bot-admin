import { ipcMain } from 'electron';
import { IAppData, TDiscordData } from '../../../src/store/types/app-store-types';
import { localConfigService } from '../local-config/service';
import { discordClientService } from '../discord-client/service';
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { filesDirname, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../../global';
import isDev from 'electron-is-dev';
import { databaseService } from '../database/service';

class AppDataService {
	appDataPromise: Promise<IAppData> | null = null;
	appData: IAppData | null = null;
	win: BrowserWindow | null = null;

	constructor() {
		this.appDataPromise = this.initData(false);
	}

	createWindow(): BrowserWindow {
		const win = new BrowserWindow({
			icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
			width: 1280,
			height: 720,
			backgroundColor: '#121212',
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(filesDirname, 'preload.mjs'),
			},
			autoHideMenuBar: !isDev,
		});

		if (isDev) {
			win.webContents.openDevTools();
		}

		win.maximize();

		if (VITE_DEV_SERVER_URL) {
			win.loadURL(VITE_DEV_SERVER_URL);
		} else {
			win.loadFile(path.join(RENDERER_DIST, 'index.html'));
		}

		this.win = win;

		return win;
	}

	initEvents() {
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit();
				this.win = null;
			}
		});

		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				this.createWindow();
			}
		});

		app.whenReady().then(() => this.createWindow());

		let isDataSent = false;

		ipcMain.on('renderer-ready', async () => {
			const appData = await this.appDataPromise;
			if (isDataSent) {
				return;
			}

			this.win?.webContents.send('server-initialized', { appData });
			isDataSent = true;
		});
	}

	async reinitData() {
		this.appDataPromise = this.initData(true);
		return await this.appDataPromise;
	}

	async initData(isReinit: boolean): Promise<IAppData> {
		const localConfig = await localConfigService.getLocalConfig();
		await databaseService.connect(localConfig);

		const config = await databaseService.getAppConfig();
		const discordLoginResult = await discordClientService.login(config);

		const bot = discordClientService.bot;

		let discordData: TDiscordData | null = null;
		if (isReinit && !discordLoginResult?.newInit && this.appData?.botInfo) { // use cache for optimization
			console.log('get discord config from cache');
			discordData = this.getDiscordCachedData();
		} else {
			console.log('fetch discord config');
			discordData = {
				roles: await discordClientService.getRoles(),
				channels: (await discordClientService.getChannels()).filter(c => [ 0, 2, 4 ].includes(c.type)),
				members: await discordClientService.getMembers(),
				botInfo: bot && {
					id: bot.id,
					tag: bot.tag,
				}
			};
		}

		this.appData = {
			config,
			localConfig,
			...discordData,
		};

		return this.appData;
	}

	getDiscordCachedData(): TDiscordData {
		const appData = this.appData!;

		const data = {
			roles: appData.roles,
			channels: appData.channels,
			botInfo: appData.botInfo,
			members: appData.members,
		};

		return data;
	}

	async refetchDiscordData() {
		const appData = this.appData!;

		appData.botInfo = null;
		appData.channels = [];
		appData.roles = [];

		return await this.reinitData();
	}
}

export const appDataService = new AppDataService();
