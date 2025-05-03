import mongoose, { Document, Model } from 'mongoose';
import { TConfig } from '../../../../src/schemas/config/config';

interface IConfig extends Document {
	config: TConfig;
}

const ConfigSchema = new mongoose.Schema<IConfig>(
	{
		config: { type: Object, required: true },
	},
	{ timestamps: true }
);

export const ConfigModel: Model<IConfig> = mongoose.model<IConfig>('Config', ConfigSchema);
