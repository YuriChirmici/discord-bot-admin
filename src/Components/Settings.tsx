import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Toolbar,
	Typography,
	Switch,
	FormControlLabel,
	FormGroup
} from '@mui/material';
import { useThemeContext } from '../theme/ThemeContext';
import { ConfigFileUpload } from './ConfigFileUpload';

export const Settings = () => {
	const [ version, setVersion ] = useState('');
	const { toggleTheme, isDark } = useThemeContext();

	useEffect(() => {
		window.ipcRenderer.invoke('get-app-version').then(setVersion);
	}, []);

	const handleCheckUpdates = async () => {
		try {
			const result = await window.ipcRenderer.invoke('check-for-updates');
			alert(result.message);
		} catch (error) {
			console.error(error);
			alert('Ошибка при проверке обновлений.');
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Toolbar />
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
