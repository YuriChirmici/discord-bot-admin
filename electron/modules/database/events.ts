import { ipcMain } from 'electron';
import { databaseService } from '../database/service';
import { TConfig } from '../../../src/schemas/config/config';
import { appDataService } from '../app-module/service';
import { SlotModel } from './models/Slot';
import { ISlot } from '../../../src/components/sections/slots/types';

// ipcMain.handle('get-config', async (): Promise<TConfig | null> => {
// 	const config = await databaseService.getAppConfig();
// 	return config;
// });

ipcMain.handle('set-config', async (_event, config: TConfig) => {
	await databaseService.setConfig(config);
	return await appDataService.reinitData();
});

ipcMain.handle('get-users-slots', async (): Promise<ISlot[]> => {
	const slots = await SlotModel.find({ memberId: { $exists: true, $ne: '' } }).sort({ serialNumber: 1 }).lean();

	const filteredSlots = slots.map((slot): ISlot => ({
		serialNumber: slot.serialNumber,
		memberId: slot.memberId,
	}));

	const members = appDataService.appData?.members || [];

	filteredSlots.forEach((slot) => {
		const member = members.find((member) => member.id === slot.memberId);
		if (member) {
			slot.memberName = member.name;
		}
	});

	return filteredSlots;
});

interface IClearSlotData {
	serialNumber: number;
}
ipcMain.handle('clear-user-slot', async (_event, { serialNumber }: IClearSlotData) => {
	const slot = await SlotModel.findOne({ serialNumber, memberId: { $exists: true, $ne: '' } }).lean();
	if (!slot) {
		return;
	}

	await SlotModel.updateOne({ serialNumber }, { $unset: { memberId: '' } });
});
