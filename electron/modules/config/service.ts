import { app } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { configSchema, TConfig } from '../../../src/schemas/config/config';

class ConfigService {
	configPath: string;
	constructor() {
		const savedDataPath = path.join(app.getPath('userData'), 'saved-data');
		this.configPath = path.join(savedDataPath, 'config.json');
		if (!fs.existsSync(savedDataPath)) {
			fs.mkdirSync(savedDataPath);
		}

		if (!fs.existsSync(this.configPath)) {
			fs.writeFileSync(this.configPath, JSON.stringify({}));
		}

		console.log('Config path: ' + this.configPath);
	}

	async setConfig(config: TConfig) {
		const parsedData = configSchema.parse(config);
		await fs.promises.writeFile(this.configPath, JSON.stringify(parsedData, null, 2), 'utf-8');
	}

	async getConfig(): Promise<TConfig> {
		const dataString = await fs.promises.readFile(this.configPath, 'utf-8');
		const data = dataString ? JSON.parse(dataString) : {};

		return data;
	}
}

export const configService = new ConfigService();
