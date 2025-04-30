import { autoUpdater } from 'electron-updater';
import { ipcMain, app } from 'electron';

autoUpdater.setFeedURL({
	provider: 'github',
	owner: 'YuriChirmici',
	repo: 'discord-bot-admin',
});

const checkUpdate = async () => {
	return new Promise((resolve, reject) => {
		try {
			autoUpdater.once('update-available', (info) => {
				console.log('Update available:', info);
				resolve('success');
			});

			autoUpdater.once('update-not-available', (info) => {
				console.log('No update available:', info);
				resolve('no-update');
			});

			autoUpdater.once('update-downloaded', (info) => {
				console.log('Update downloaded:', info);
				autoUpdater.quitAndInstall();
			});

			autoUpdater.once('error', (err) => {
				reject(err);
			});

			autoUpdater.checkForUpdatesAndNotify();
		} catch (error) {
			console.error('Error checking for updates:', error);
			reject(error);
		}
	});
};

ipcMain.handle('check-for-updates', async () => {
	try {
		const result = await checkUpdate();
		if (result === 'success') {
			return { message: 'Обновление будет установлено в ближайшее время.' };
		} else if (result === 'no-update') {
			return { message: 'Версия актуальная.' };
		}
	} catch (err) {
		console.error(err);
		return { message: 'Ошибка при проверке обновлений.' };
	}
});

ipcMain.handle('get-app-version', () => {
	const version = app.getVersion();
	return version;
});
