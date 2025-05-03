import { ipcMain } from 'electron';
import { databaseService } from '../database/service';
import { TConfig } from '../../../src/schemas/config/config';
import { appDataService } from '../app-module/service';

// ipcMain.handle('get-config', async (): Promise<TConfig | null> => {
// 	const config = await databaseService.getAppConfig();
// 	return config;
// });

ipcMain.handle('set-config', async (_event, config: TConfig) => {
	await databaseService.setConfig(config);
	return await appDataService.reinitData();
});
