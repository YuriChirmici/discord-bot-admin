import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertType;
  showAlert: (message: string, severity?: AlertType) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
	open: false,
	message: '',
	severity: 'info',
	showAlert: (message, severity = 'info') => {
		message ||= 'неизвестная ошибка';
		set({ open: true, message, severity });
	},
	closeAlert: () => set({ open: false }),
}));
