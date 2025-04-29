import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Toolbar,
	Typography,
} from '@mui/material';

export const Settings = () => {
	const [ version, setVersion ] = useState('');

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
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 3 }}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Toolbar />
				<Typography variant="h4" gutterBottom>
					Настройки
				</Typography>

				{/* Кнопка для проверки обновлений */}
				<Button variant="contained" onClick={handleCheckUpdates} sx={{ marginBottom: 2 }}>
					Проверить обновления
				</Button>

				{version && (
					<Typography variant="body1" sx={{ marginTop: 2 }}>
						Версия приложения: {version}
					</Typography>
				)}
			</Container>
		</Box>
	);
};
