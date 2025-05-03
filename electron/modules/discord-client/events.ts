import { ipcMain } from 'electron';
import { PermissionFlagsBits } from 'discord.js';

ipcMain.handle('get-discord-permissions-flags', (): string[] => {
	return Object.keys(PermissionFlagsBits);
});
