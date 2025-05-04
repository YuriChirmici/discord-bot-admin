import {
	Autocomplete,
	TextField,
	Typography,
} from '@mui/material';
import { BaseConfigPageLayout } from '../../BaseConfigPageLayout';
import { TConfig } from '../../../schemas/config/config';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';
import { SlotUsersList } from './SlotUsersList';
import { ISlot } from './types';
import { useAlertStore } from '../../../store/useAlertStore';

interface Props { }
export const Slots: React.FC<Props> = () => {
	const { channels, setLoading } = useAppStore();
	const [ slots, setSlots ] = useState<ISlot[]>([]);
	const { showAlert } = useAlertStore();

	const validate = (dirtyConfig: TConfig) => {
		const { sheetMembersChannelId, sheetValidationCode } = dirtyConfig;
		if (!sheetMembersChannelId || !sheetValidationCode) {
			return { isValid: false };
		}

		return { isValid: true };
	};

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				setLoading(true);
				const slots = await window.ipcRenderer.invoke('get-users-slots') as ISlot[];
				setSlots(slots);
			} catch (err) {
				showAlert(err instanceof Error ? err.message : '', 'error');
			} finally {
				setLoading(false);
			}
		};
		fetchSlots();
	}, []);

	const handleDeleteSlot = async (serialNumber: number) => {
		try {
			setLoading(true);
			await window.ipcRenderer.invoke('clear-user-slot', { serialNumber });
			setSlots((prev) => prev.map((slot) => slot.serialNumber === serialNumber ? { ...slot, isDeleted: true } : slot));
		} catch (err) {
			showAlert(err instanceof Error ? err.message : '', 'error');
		} finally {
			setLoading(false);
		}
	};

	return (<>
		<BaseConfigPageLayout validate={validate}>
			{(dirtyConfig, setDirtyConfig) => (<>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Слоты
				</Typography>

				<Autocomplete
					options={channels.filter(c => c.type === 0)}
					getOptionLabel={(option) => option.name}
					getOptionKey={(option => option.id)}
					value={channels.find(c => c.id === dirtyConfig.sheetMembersChannelId) || null}
					onChange={(_, val) => setDirtyConfig(({ ...dirtyConfig, sheetMembersChannelId: val?.id || '' }))}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Канал слотов"
							error={!dirtyConfig.sheetMembersChannelId}
						/>
					)}
				/>

				<TextField
					label="Код валидации листа"
					fullWidth
					value={dirtyConfig.sheetValidationCode}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, sheetValidationCode: e.target.value }))}
					sx={{ mb: 3 }}
					error={!dirtyConfig.sheetValidationCode}
				/>
			</>)}
		</BaseConfigPageLayout>

		<SlotUsersList
			slots={slots}
			handleDelete={handleDeleteSlot}
		/>
	</>);
};
