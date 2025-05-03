import { ipcMain } from 'electron';
import { localConfigService } from './service';
import { TConfig } from '../../../src/schemas/config/config';
import { appDataService } from '../app-module/service';

// ipcMain.handle('get-local-config', async () => {
// 	const config = await localConfigService.getLocalConfig();
// 	return config;
// });

ipcMain.handle('set-local-config', async (_event, config: TConfig) => {
	await localConfigService.setLocalConfig(config);
	return await appDataService.reinitData();
});
