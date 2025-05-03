import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography
} from '@mui/material';

interface Props {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	content?: string;
}
export const ConfirmDialog: React.FC<Props> = ({
	open,
	onClose,
	onConfirm,
	title = 'Подтверждение',
	content = 'Вы уверены?',
}: Props) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography>{content}</Typography>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-around' }}>
				<Button onClick={onClose}>Отмена</Button>
				<Button onClick={onConfirm} color="error" variant="contained">
					Подтвердить
				</Button>
			</DialogActions>
		</Dialog>
	);
};
