import { ipcRenderer, contextBridge } from 'electron';
import { shell } from 'electron';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [ channel, listener ] = args;
		return ipcRenderer.on(channel, (event, ...params) => listener(event, ...params));
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [ channel, ...omit ] = args;
		return ipcRenderer.off(channel, ...omit);
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [ channel, ...omit ] = args;
		return ipcRenderer.send(channel, ...omit);
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [ channel, ...omit ] = args;
		return ipcRenderer.invoke(channel, ...omit);
	},

	// You can expose other APTs you need here.
	openExternal: (url: string) => shell.openExternal(url),
});
