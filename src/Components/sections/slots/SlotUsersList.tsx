import React, { useState } from 'react';
import {
	Box,
	TextField,
	Typography,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ISlot } from './types';
import { ConfirmDialog } from '../../ui/ConfirmDialog';

interface Props {
	slots: ISlot[];
	handleDelete: (serialNumber: number) => void;
}

export const SlotUsersList: React.FC<Props> = ({ slots, handleDelete }) => {
	const [ search, setSearch ] = useState('');
	const [ openConfirm, setOpenConfirm ] = useState(false);
	const [ selectedSerial, setSelectedSerial ] = useState<number | null>(null);

	const selectedItem = slots.find((slot) => String(slot.serialNumber) === search);
	const displayList = (search ? (selectedItem ? [ selectedItem ] : []) : slots).filter((slot) => !slot.isDeleted);

	const handleOpenDialog = (serialNumber: number) => {
		setSelectedSerial(serialNumber);
		setOpenConfirm(true);
	};

	const handleConfirm = () => {
		if (selectedSerial) {
			handleDelete(selectedSerial);
		}
		setOpenConfirm(false);
	};

	return (
		<Box mt={2} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto', p: 2 }}>
			<Typography variant="h6" gutterBottom>
				Список Ячеек
			</Typography>

			<TextField
				label="Поиск по номеру ячейки"
				variant="outlined"
				fullWidth
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				sx={{ mb: 2 }}
			/>

			<Paper elevation={2}>
				<List sx={{ padding: 0 }}>
					{displayList.map((slot) => (
						<ListItem
							key={slot.serialNumber}
							secondaryAction={
								<IconButton edge="end" onClick={() => handleOpenDialog(slot.serialNumber)}>
									<DeleteIcon color="error" />
								</IconButton>
							}
							divider
						>
							<ListItemText
								primary={`${slot.serialNumber}: ${slot.memberId}`}
							/>
						</ListItem>
					))}

					{displayList.length === 0 && (
						<ListItem>
							<ListItemText primary="Ячейки не найдены" />
						</ListItem>
					)}
				</List>
			</Paper>

			<ConfirmDialog
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				onConfirm={handleConfirm}
				title="Очищение ячейки"
				content="Вы уверены, что хотите очистить эту ячейку?"
			/>
		</Box>
	);
};
