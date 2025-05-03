import { create } from 'zustand';
import { TConfig, TLocalConfig } from '../schemas/config/config';
import { IAppData, IChannel, IRole } from './app-store-types';

interface AppState {
	config: TConfig | null;
	setConfig: (config: TConfig) => void;

	localConfig: TLocalConfig | null;
	setLocalConfig: (config: TLocalConfig) => void;

	serverReady: boolean;
	setServerReady: (loading: boolean) => void;

	loading: boolean;
	setLoading: (loading: boolean) => void;

	setAppData: (data: IAppData) => void;

	roles: IRole[];
	channels: IChannel[];
	botInfo: IAppData['botInfo'];
}

export const useAppStore = create<AppState>((set) => ({
	config: null,
	setConfig: (config) => set({ config }),

	localConfig: null,
	setLocalConfig: (localConfig) => set({ localConfig }),

	serverReady: false,
	setServerReady: (serverReady) => set({ serverReady }),

	loading: false,
	setLoading: (loading) => set({ loading }),

	setAppData: (data) => set({
		config: data.config,
		localConfig: data.localConfig,
		roles: data.roles,
		channels: data.channels,
		botInfo: data.botInfo,
	}),

	roles: [],
	channels: [],
	botInfo: null,
}));
