import { TConfig, TLocalConfig } from '../../schemas/config/config';

export interface IRole {
	id: string;
	name: string;
}

export interface IChannel {
	id: string;
	name: string;
	type: 0 | 2 | 4;
	parentId: string | null;
}
// 0 - Text
// 2 - Voice
// 4 - Category

export interface IBotInfo {
	id: string;
	tag: string;
}

export interface IMember {
	id: string;
	name: string;
	tag: string;
	// roles?: string[];
}

export interface IAppData {
	config: TConfig | null;
	localConfig: TLocalConfig | null;
	roles: IRole[];
	channels: IChannel[];
	members: IMember[];
	botInfo: IBotInfo | null;
}

export type TDiscordData = Pick<IAppData, 'roles' | 'channels' | 'members' | 'botInfo'>;
