import { ipcMain } from 'electron';
import { configService } from './service';
import { TConfig } from '../../../src/schemas/config/config';
import { appDataService } from '../app-module/service';

ipcMain.handle('get-config', async () => {
	const config = await configService.getConfig();
	return config;
});

ipcMain.handle('upload-config-file', async (_event, config: TConfig) => {
	await configService.uploadConfigFile(config);
	return await appDataService.reinitData();
});

