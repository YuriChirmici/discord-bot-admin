import { TConfig } from '../schemas/config/config';

export interface ISection {
	text: string;
	path: string;
}

interface IUseMenu {
	sections: ISection[];
}

export const useMenu = (config: TConfig | null): IUseMenu => {
	const configInitialized = !!config?.clientId;

	const sections = [
		...(
			configInitialized ? [
				{ text: 'Основное', path: '/general' },
				{ text: 'Temp Voice', path: '/temp-voice' },
				{ text: 'Слоты', path: '/slots' },
				{ text: 'Полки', path: '/regiments' },
				{ text: 'JSON', path: '/config-json' },
			] : []
		),
		{ text: 'Настройки', path: '/' }
	];

	return { sections };
};
