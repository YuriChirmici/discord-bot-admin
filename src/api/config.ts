import { TConfig } from '../schemas/config/config';
import { IAppData } from '../store/app-store-types';

export const getConfig = async (): Promise<TConfig> => {
	const config = await window.ipcRenderer.invoke('get-config');
	return config;
};

export const uploadConfigFile = async (config: TConfig): Promise<IAppData> => {
	return await window.ipcRenderer.invoke('upload-config-file', config);
};
