import { TConfig } from '../schemas/config/config';

export const getConfig = async (): Promise<TConfig> => {
	const config = await window.ipcRenderer.invoke('get-config');
	return config;
};

export const uploadConfigFile = async (config: TConfig) => {
	await window.ipcRenderer.invoke('upload-config-file', config);
};
