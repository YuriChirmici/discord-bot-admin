import { Client, ClientUser, Events, Guild } from 'discord.js';
import { TConfig } from '../../../src/schemas/config/config';
import { IRole } from '../../../src/store/app-store-types';

class ClientService {
	client: Client | null = null;
	guild: Guild | null = null;
	bot: ClientUser | null = null;

	async login(config: TConfig) {
		await this._createClient(config);
	}

	_createClient(config: TConfig): Promise<void> {
		return new Promise((resolve) => {
			const client = new Client({
				intents: [],
			});

			client.once(Events.ClientReady, async (readyClient) => {
				console.log(`Discord bot connected! Logged in as ${readyClient.user.tag}`);
				this.bot = readyClient.user;
				this.guild = await client.guilds.fetch(config.guildId);
				resolve();
			});

			client.login(config.token);
			this.client = client;
		});
	}

	async getRoles(): Promise<IRole[]> {
		if (!this.guild) {
			return [];
		}

		const rolesMap = await this.guild?.roles.fetch();
		const roles = rolesMap ? Array.from(rolesMap.values()) : [];

		return roles.map(role => ({
			id: role.id,
			name: role.name,
		}));
	}
}

export const discordClientService = new ClientService();
