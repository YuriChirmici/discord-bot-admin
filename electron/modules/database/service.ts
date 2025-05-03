import mongoose from 'mongoose';
import { configSchema, TConfig, TLocalConfig } from '../../../src/schemas/config/config';
import * as constants from './constants';
import { ConfigModel } from './models/Config';

class DatabaseService {
	connectionLink: string | null = null;
	constants: typeof constants;

	constructor() {
		this.constants = constants;
	}

	async connect(config: TLocalConfig): Promise<void> {
		const connectionLink = config.database?.connectionLink;
		if (!connectionLink) {
			console.warn('No connection link provided');
			return;
		}

		if (mongoose.connection.readyState === 1 && this.connectionLink === connectionLink) {
			return;
		}

		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
			console.log('Disconnected from previous database');
		}

		await mongoose.connect(connectionLink);

		console.log('Connected to database');
		this.connectionLink = connectionLink;
	}

	async getAppConfig(): Promise<TConfig | null> {
		if (mongoose.connection.readyState !== 1) {
			console.warn('Database is not connected');
			return null;
		}

		const config = await ConfigModel.findOne({ type: this.constants.APP_CONFIG }).exec();
		if (!config) {
			return null;
		}

		return config?.config;
	}

	async setConfig(rawConfig: TConfig): Promise<void> {
		const config = configSchema.parse(rawConfig);
		if (mongoose.connection.readyState !== 1) {
			throw new Error('Database is not connected');
		}

		await ConfigModel.updateOne(
			{ type: this.constants.APP_CONFIG },
			{
				config,
				source: 'admin-gui',
			}
		).exec();
	}
}

export const databaseService = new DatabaseService();
