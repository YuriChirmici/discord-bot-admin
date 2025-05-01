import { create } from 'zustand';
import { TConfig } from '../schemas/config/config';
import { IAppData, IRole } from './app-store-types';

interface AppState {
	config: TConfig | null;
	setConfig: (config: TConfig) => void;

	serverReady: boolean;
	setServerReady: (loading: boolean) => void;

	loading: boolean;
	setLoading: (loading: boolean) => void;

	setAppData: (data: IAppData) => void;

	roles: IRole[];
	botInfo: IAppData['botInfo'];

}

export const useAppStore = create<AppState>((set) => ({
	config: null,
	setConfig: (config) => set({ config }),

	serverReady: false,
	setServerReady: (serverReady) => set({ serverReady }),

	loading: false,
	setLoading: (loading) => set({ loading }),

	setAppData: (data) => set({
		config: data.config,
		roles: data.roles,
		botInfo: data.botInfo,
	}),

	roles: [],
	botInfo: null,

}));
