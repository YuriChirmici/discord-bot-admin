import { Client, ClientUser, Events, Guild } from 'discord.js';
import { TConfig } from '../../../src/schemas/config/config';
import { IChannel, IRole } from '../../../src/store/app-store-types';

class ClientService {
	client: Client | null = null;
	currentClientId: string | null = null;
	guild: Guild | null = null;
	bot: ClientUser | null = null;

	async login(config: TConfig | null): Promise<{ newInit: boolean } | void> {
		if (!config) {
			return;
		}

		const { token, clientId } = config;

		if (!token || !clientId) {
			console.warn('Missing token or clientId');
			return;
		}

		if (this.client && this.currentClientId === clientId) {
			console.log('Discord client already connected');
			return;
		}

		if (this.client) {
			console.log('Disconnecting previous Discord client');
			this.client.destroy();
			this.client = null;
		}

		console.log('starting discord client');
		await this._createClient(config);

		return { newInit: true };
	}

	_createClient(config: TConfig): Promise<void> {
		return new Promise((resolve) => {
			const client = new Client({
				intents: [],
			});

			client.once(Events.ClientReady, async (readyClient) => {
				console.log(`Discord bot connected! Logged in as ${readyClient.user.tag}`);
				this.currentClientId = config.clientId;
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

		const rolesMap = await this.guild.roles.fetch();
		const roles = Array.from(rolesMap.values());

		return roles.map(role => ({
			id: role.id,
			name: role.name,
		}));
	}

	async getChannels(): Promise<IChannel[]> {
		if (!this.guild) {
			return [];
		}

		const channelsMap = await this.guild.channels.fetch();
		const channels = Array.from(channelsMap.values());

		return channels
			.map((channel) => {
				if (!channel) {
					return null;
				}

				return {
					id: channel.id,
					name: channel.name,
					type: channel.type,
				};
			})
			.filter((c): c is IChannel => c !== null);
	}
}

export const discordClientService = new ClientService();
