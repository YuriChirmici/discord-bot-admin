import mongoose, { Document, Model } from 'mongoose';
import { TConfig } from '../../../../src/schemas/config/config';

interface IConfig extends Document {
	type: string;
	config: TConfig;
	source: 'bot' | 'admin-gui';
}

const ConfigSchema = new mongoose.Schema<IConfig>(
	{
		type: String,
		config: Object,
		source: String,
	},
	{ timestamps: true }
);

export const ConfigModel: Model<IConfig> = mongoose.model<IConfig>('Config', ConfigSchema);
