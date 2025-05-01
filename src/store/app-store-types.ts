import { TConfig } from '../schemas/config/config';

export interface IRole {
	id: string;
	name: string;
}

export interface IBotInfo {
	id: string;
	tag: string;
}

export interface IAppData {
	config: TConfig | null;
	roles: IRole[];
	botInfo: IBotInfo | null;
}
