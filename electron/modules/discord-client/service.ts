import { Client, ClientUser, Events, GatewayIntentBits, Guild } from 'discord.js';
import { TConfig } from '../../../src/schemas/config/config';
import { IChannel, IMember, IRole } from '../../../src/store/types/app-store-types';

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
				intents: [
					GatewayIntentBits.Guilds,
					GatewayIntentBits.GuildMembers,
					GatewayIntentBits.GuildMessages,
				],
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

		return roles
			.sort((a, b) => b.position - a.position)
			.map(role => ({
				id: role.id,
				name: role.name,
			}));
	}

	async getChannels(): Promise<IChannel[]> {
		if (!this.guild) {
			return [];
		}

		const [ channelsMap, activeThreadsMap ] = await Promise.all([
			this.guild.channels.fetch(),
			this.guild.channels.fetchActiveThreads(),
		]);

		const channels = Array.from(channelsMap.values());
		const activeThreads = Array.from(activeThreadsMap.threads.values());

		const resultChannels = channels
			.map((channel) => {
				if (!channel) {
					return null;
				}

				return {
					id: channel.id,
					name: channel.name,
					type: channel.type,
					parentId: channel.parentId,
				};
			})
			.filter((c): c is IChannel => c !== null);

		for (const thread of activeThreads) {
			resultChannels.push({
				id: thread.id,
				name: thread.name,
				type: 0,
				parentId: thread.parentId,
			});
		}

		return resultChannels;
	}

	async getMembers(): Promise<IMember[]> {
		if (!this.guild) {
			return [];
		}

		const membersMap = await this.guild.members.fetch();
		const members = Array.from(membersMap.values());

		return members.map(member => ({
			id: member.id,
			name: member.user.username,
			tag: member.user.tag,
			// roles: member.roles.cache.map(role => role.id),
		}));
	}
}

export const discordClientService = new ClientService();
