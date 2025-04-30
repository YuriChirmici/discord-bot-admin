import { Client, Events, Guild } from 'discord.js';
import { TConfig } from '../../../src/schemas/config/config';

class ClientService {
	client: Client | null = null;
	guild: Guild | null = null;

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
				this.guild = await client.guilds.fetch(config.guildId);
				resolve();

			});

			client.login(config.token);
			this.client = client;
		});
	}
}

export const discordClientService = new ClientService();
