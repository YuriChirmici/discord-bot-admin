import {
	Box,
	Button,
	CssBaseline,
	TextField,
	Typography,
} from '@mui/material';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { setConfig } from '../api/config';
import { TConfig } from '../schemas/config/config';
import PasswordInput from './ui/PasswordInput';

interface Props { }
export const General: React.FC<Props> = () => {
	const { config, setLoading, setAppData } = useAppStore();
	const [ dirtyConfig, setDirtyConfig ] = useState<TConfig>(config!);

	const handleSave = async () => {
		try {
			setLoading(true);
			const newConfig = await setConfig(dirtyConfig);
			setAppData(newConfig);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, margin: '0 auto', padding: 2 }}>
			<CssBaseline />
			<Typography variant="h4" gutterBottom marginBottom={5}>
				Основное
			</Typography>

			<TextField
				label="ID сервера"
				fullWidth
				value={dirtyConfig.guildId}
				onChange={(e) => setDirtyConfig((prev) => ({ ...prev, guildId: e.target.value }))}
				sx={{ mb: 2 }}
			/>

			<TextField
				label="Client ID"
				fullWidth
				value={dirtyConfig.clientId}
				onChange={(e) => setDirtyConfig((prev) => ({ ...prev, clientId: e.target.value }))}
				sx={{ mb: 2 }}
			/>

			<PasswordInput
				label="Токен бота"
				fullWidth
				value={dirtyConfig.token}
				onValueChange={(token) => setDirtyConfig((prev) => ({ ...prev, token }))}
				sx={{ mb: 2 }}
			/>

			<TextField
				label="ID бота"
				fullWidth
				value={dirtyConfig.botMemberId}
				onChange={(e) => setDirtyConfig((prev) => ({ ...prev, botMemberId: e.target.value }))}
				sx={{ mb: 2 }}
			/>

			<PasswordInput
				label="Строка подключения к БД"
				fullWidth
				value={dirtyConfig.database.connectionLink}
				onValueChange={(connectionLink) => setDirtyConfig((prev) => ({ ...prev, database: { ...prev.database, connectionLink } }))}
				sx={{ mb: 2 }}
			/>

			<Box sx={{ display: 'flex', marginTop: 3 }}>
				<Button variant="contained" onClick={handleSave}>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
