import { TConfig } from '../schemas/config/config';

export interface ISection {
	text: string;
	path: string;
}

interface IUseMenu {
	sections: ISection[];
}

export const useMenu = (config: TConfig | null): IUseMenu => {
	const configInitialized = config?.clientId !== null;

	const sections = [
		// { text: 'Основное', path: '/' },
		...(
			configInitialized ? [
				// { text: 'Роли', path: '/roles' },
			] : []
		),
		{ text: 'Настройки', path: '/' }
	];

	return { sections };
};
