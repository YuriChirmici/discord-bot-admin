import { ipcMain } from 'electron';
import { IAppData } from '../../../src/store/app-store-types';
import { configService } from '../config/service';
import { discordClientService } from '../discord-client/service';
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { filesDirname, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../../global';
import isDev from 'electron-is-dev';

class AppDataService {
	appDataPromise: Promise<IAppData> | null = null;
	appData: IAppData | null = null;
	win: BrowserWindow | null = null;

	constructor() {
		this.appDataPromise = this.initData();
	}

	createWindow(): BrowserWindow {
		const win = new BrowserWindow({
			icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
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
		this.appDataPromise = this.initData();
		return await this.appDataPromise;
	}

	async initData(): Promise<IAppData> {
		const config = await configService.getConfig();
		if (!discordClientService.client && config?.token && config?.guildId) {
			console.log('starting discord client');
			await discordClientService.login(config);
		}

		const bot = discordClientService.bot;
		const roles = await discordClientService.getRoles();

		return {
			config,
			roles,
			botInfo: bot && {
				id: bot.id,
				tag: bot.tag,
			}
		};
	}
}

export const appDataService = new AppDataService();
