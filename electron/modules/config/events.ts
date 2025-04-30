import { ipcMain } from 'electron';
import { configService } from './service';
import { TConfig } from '../../../src/schemas/config/config';
import { discordClientService } from '../discord-client/service';

ipcMain.handle('get-config', async () => {
	const config = await configService.getConfig();
	return config;
});

ipcMain.handle('upload-config-file', async (_event, config: TConfig) => {
	await configService.uploadConfigFile(config);
	if (!discordClientService.client && config?.token && config?.guildId) {
		await discordClientService.login(config);
	}
});
