import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Typography,
	Switch,
	FormControlLabel,
	FormGroup
} from '@mui/material';
import { useThemeContext } from '../theme/ThemeContext';
import { ConfigFileUpload } from './ConfigFileUpload';
import { useAppStore } from '../store/useAppStore';

interface Props {}
export const Settings: React.FC<Props> = () => {
	const [ version, setVersion ] = useState('');
	const { toggleTheme, isDark } = useThemeContext();
	const { setLoading } = useAppStore();

	useEffect(() => {
		window.ipcRenderer.invoke('get-app-version').then(setVersion);
	}, []);

	const handleCheckUpdates = async () => {
		try {
			setLoading(true);
			const result = await window.ipcRenderer.invoke('check-for-updates');
			setLoading(false);

			setTimeout(() => alert(result.message), 10);
		} catch (error) {
			console.error(error);
			alert('Ошибка при проверке обновлений.');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Typography variant="h4" gutterBottom>
					Настройки
				</Typography>

				<ConfigFileUpload />

				<Button variant="contained" onClick={handleCheckUpdates} sx={{ marginBottom: 2 }}>
					Проверить обновления
				</Button>

				<FormGroup>
					<FormControlLabel
						control={<Switch checked={isDark} onChange={() => toggleTheme()} />}
						label="Тёмная тема"
					/>
				</FormGroup>

				{version && (
					<Typography variant="body1" sx={{ marginTop: 2 }}>
						Версия приложения: {version}
					</Typography>
				)}
			</Container>
		</Box>
	);
};
