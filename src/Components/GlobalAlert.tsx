import { Alert, Snackbar } from '@mui/material';
import { useAlertStore } from '../store/useAlertStore';

export const GlobalAlert = () => {
	const { open, message = 'test123', severity, closeAlert } = useAlertStore();

	return (
		<Snackbar open={open} autoHideDuration={4000} onClose={closeAlert}>
			<Alert severity={severity} onClose={closeAlert}>
				{message}
			</Alert>
		</Snackbar>
	);
};
