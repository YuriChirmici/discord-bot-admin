import mongoose, { Document, Model } from 'mongoose';

interface ISlot extends Document {
	serialNumber: number;
	memberId: string;
	channelId: string;
	messageId: string;
}

const SlotSchema = new mongoose.Schema<ISlot>(
	{
		serialNumber: {
			type: Number,
			unique: true,
			required: true
		},
		memberId: {
			type: String,
			unique: true,
			sparse: true
		},
		channelId: {
			type: String,
			required: true
		},
		messageId: {
			type: String,
			required: true
		}
	},
);

export const SlotModel: Model<ISlot> = mongoose.model<ISlot>('NicknameChannelSlot', SlotSchema);

