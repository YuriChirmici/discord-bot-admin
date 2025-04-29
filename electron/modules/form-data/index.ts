import { app, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

const savedDataPath = path.join(app.getPath('userData'), 'saved-data');
if (!fs.existsSync(savedDataPath)) {
	fs.mkdirSync(savedDataPath);
}

ipcMain.on('save-settings', (event, data) => {
	const filePath = path.join(savedDataPath, 'config.json');
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
	event.reply('data-saved', 'Данные успешно сохранены');
});
