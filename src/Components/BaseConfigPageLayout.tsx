import { Box, Button } from '@mui/material';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { setConfig } from '../api/config';
import { TConfig } from '../schemas/config/config';
import { useAlertStore } from '../store/useAlertStore';

interface Props {
	children: (dirtyConfig: TConfig, setDirtyConfig: (config: TConfig) => void) => React.ReactNode;
	validate?: (config: TConfig) => { validationError?: string, isValid: boolean };
	sx?: React.CSSProperties;
}

export const BaseConfigPageLayout: React.FC<Props> = ({ children, validate, sx }) => {
	const { config, setLoading, setAppData } = useAppStore();
	const [ dirtyConfig, setDirtyConfig ] = useState<TConfig>(config!);
	const { showAlert } = useAlertStore();

	const handleSave = async () => {
		try {
			if (!validate) {
				return;
			}

			const validationResult = validate(dirtyConfig);
			if (!validationResult.isValid) {
				showAlert(validationResult.validationError || 'Заполните все поля', 'error');
				return;
			}

			setLoading(true);
			const newConfig = await setConfig(dirtyConfig);
			setAppData(newConfig);
			showAlert('Настройки успешно сохранены', 'success');
		} catch (err) {
			console.error(err);
			showAlert(err instanceof Error ? err.message : 'Неизвестная ошибка', 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto', p: 2, ...(sx || {}) }}>
			{children(dirtyConfig, setDirtyConfig)}

			<Box sx={{ display: 'flex', mt: 2 }}>
				<Button variant="contained" onClick={handleSave}>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
