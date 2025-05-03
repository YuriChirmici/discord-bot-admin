import { ipcMain } from 'electron';
import { localConfigService } from './service';
import { TConfig } from '../../../src/schemas/config/config';
import { appDataService } from '../app-module/service';
import { IAppData } from '../../../src/store/types/app-store-types';

// ipcMain.handle('get-local-config', async () => {
// 	const config = await localConfigService.getLocalConfig();
// 	return config;
// });

ipcMain.handle('set-local-config', async (_event, config: TConfig): Promise<IAppData> => {
	await localConfigService.setLocalConfig(config);
	return await appDataService.reinitData();
});

ipcMain.handle('refresh-discord-cache', async (): Promise<IAppData | void> => {
	return await appDataService.refetchDiscordData();
});
