import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Typography,
	Switch,
	FormControlLabel,
	FormGroup
} from '@mui/material';
import { useThemeContext } from '../../theme/ThemeContext';
// import { ConfigFileUpload } from './ConfigFileUpload';
import { useAppStore } from '../../store/useAppStore';
import PasswordInput from '../ui/PasswordInput';
import { refreshDiscordCache, setLocalConfig } from '../../api/config';
import { useAlertStore } from '../../store/useAlertStore';

interface Props {}
export const Settings: React.FC<Props> = () => {
	const [ version, setVersion ] = useState('');
	const { toggleTheme, isDark } = useThemeContext();
	const { localConfig, setLoading, setAppData } = useAppStore();
	const [ connectionString, setConnectionString ] = useState(localConfig?.database?.connectionLink || '');
	const { showAlert } = useAlertStore();

	useEffect(() => {
		window.ipcRenderer.invoke('get-app-version').then(setVersion);
	}, []);

	const handleCheckUpdates = async () => {
		try {
			setLoading(true);
			const result = await window.ipcRenderer.invoke('check-for-updates');
			setLoading(false);
			showAlert(result.message);
		} catch (error) {
			console.error(error);
			showAlert('Ошибка при проверке обновлений.');
		}
	};

	const handleSave = async () => {
		try {
			setLoading(true);
			const newConfig = await setLocalConfig({
				...localConfig,
				database: {
					...localConfig?.database,
					connectionLink: connectionString
				}
			});
			setAppData(newConfig);
			showAlert('Настройки успешно сохранены', 'success');
		} catch (err) {
			showAlert((err instanceof Error ? err.message : ''), 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleRefreshDiscordCache = async () => {
		try {
			setLoading(true);
			const newConfig = await refreshDiscordCache();
			setAppData(newConfig);
			setLoading(false);

		} catch (err) {
			console.error(err);
			showAlert('Ошибка при обновлении кэша дискорда.');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Container maxWidth="sm">
				<Typography variant="h4" gutterBottom>
					Настройки
				</Typography>

				{/* <ConfigFileUpload /> */}

				<Button variant="contained" onClick={handleCheckUpdates} sx={{ marginBottom: 2 }}>
					Проверить обновления
				</Button>

				<br/>

				<Button variant="contained" onClick={handleRefreshDiscordCache} sx={{ marginBottom: 2 }}>
					Обновить дискорд кэш
				</Button>

				<FormGroup>
					<FormControlLabel
						control={<Switch checked={isDark} onChange={() => toggleTheme()} />}
						label="Тёмная тема"
					/>
				</FormGroup>

				<Box sx={{ marginTop: 5, marginBottom: 2 }}>
					<Typography variant="h5" mb={2}>
						Настройки базы данных
					</Typography>

					<PasswordInput
						label="Ссылка подключения к БД"
						fullWidth
						value={connectionString}
						onValueChange={(value) => setConnectionString(value)}
						sx={{ mb: 2 }}
					/>

					<Button variant="contained" onClick={handleSave} sx={{ marginBottom: 2 }}>
						Сохранить
					</Button>
				</Box>

				{version && (
					<Typography variant="body1" sx={{ marginTop: 5 }}>
						Версия приложения: {version}
					</Typography>
				)}
			</Container>
		</Box>
	);
};
