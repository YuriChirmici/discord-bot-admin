import { app } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { localConfigSchema, TLocalConfig } from '../../../src/schemas/config/config';

class LocalConfigService {
	localConfigPath: string;

	constructor() {
		const savedDataPath = path.join(app.getPath('userData'), 'saved-data');
		this.localConfigPath = path.join(savedDataPath, 'config.json');
		if (!fs.existsSync(savedDataPath)) {
			fs.mkdirSync(savedDataPath);
		}

		if (!fs.existsSync(this.localConfigPath)) {
			fs.writeFileSync(this.localConfigPath, JSON.stringify({}));
		}

		console.log('Config path: ' + this.localConfigPath);
	}

	async setLocalConfig(config: TLocalConfig) {
		const parsedData = localConfigSchema.parse(config);
		await fs.promises.writeFile(this.localConfigPath, JSON.stringify(parsedData, null, 2), 'utf-8');
	}

	async getLocalConfig(): Promise<TLocalConfig> {
		const dataString = await fs.promises.readFile(this.localConfigPath, 'utf-8');
		const data = dataString ? JSON.parse(dataString) : {};

		return data;
	}
}

export const localConfigService = new LocalConfigService();
