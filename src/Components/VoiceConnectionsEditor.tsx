import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from '../store/useAppStore';
import { TConfig } from '../schemas/config/config';

interface VoiceConnection {
	channelId: string;
	categoryId: string;
	channelName: string;
}

interface Props {
	config: TConfig;
	onChange: (value: VoiceConnection[]) => void;
}

export const VoiceConnectionsEditor: React.FC<Props> = ({ config, onChange }) => {
	const { channels } = useAppStore();

	const voiceChannels = channels.filter(c => c.type === 2);
	const categoryChannels = channels.filter(c => c.type === 4);

	const voiceConnections = config?.voiceConnections || [];

	const handleAdd = () => {
		const emptyConnection = voiceConnections.find((c) => c.channelId === '');
		if (emptyConnection) {
			return; // already have an empty connection
		}

		onChange([
			...voiceConnections,
			{
				channelId: voiceChannels.find(c => !voiceConnections.find(v => v.channelId === c.id))?.id || '',
				categoryId: voiceConnections[0]?.categoryId || categoryChannels[0]?.id || '',
				channelName: ''
			}
		]);
	};

	const handleUpdate = (channelId: string, updated: VoiceConnection) => {
		const newConnections = [ ...voiceConnections ];
		const index = newConnections.findIndex((c) => c.channelId === channelId);
		newConnections[index] = updated;
		onChange(newConnections);
	};

	const handleRemove = (channelId: string) => {
		const newConnections = voiceConnections.filter((c) => c.channelId !== channelId);
		onChange(newConnections);
	};

	return (
		<Box>
			<Typography variant="h6" gutterBottom>
				Голосовые каналы
			</Typography>

			{voiceConnections.map((conn) => {
				const selectedChannel = channels.find(c => c.id === conn.channelId);
				const selectedCategory = channels.find(c => c.id === conn.categoryId);

				return (
					<Box key={conn.channelId} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
						<Autocomplete
							options={voiceChannels.filter(c => c.id === conn.channelId || !voiceConnections.find(v => v.channelId === c.id))}
							getOptionLabel={(option) => option.name}
							value={selectedChannel}
							onChange={(_, newValue) => {
								handleUpdate(conn.channelId, {
									...conn,
									channelId: newValue?.id || '',
								});
							}}
							sx={{ flex: 1 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Создающий канал"
									error={!conn.channelId}
								/>
							)}
						/>

						<Autocomplete
							options={categoryChannels}
							getOptionLabel={(option) => option.name}
							value={selectedCategory}
							onChange={(_, newValue) => {
								handleUpdate(conn.channelId, {
									...conn,
									categoryId: newValue?.id || '',
								});
							}}
							sx={{ flex: 1 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Вкладка"
									error={!conn.categoryId}
								/>
							)}
						/>

						<TextField
							label="Название созданного канала"
							value={conn.channelName}
							onChange={(e) => handleUpdate(conn.channelId, { ...conn, channelName: e.target.value })}
							sx={{ flex: 1 }}
							error={!conn.channelName}
						/>

						<IconButton onClick={() => handleRemove(conn.channelId)} color="error">
							<DeleteIcon />
						</IconButton>
					</Box>
				);
			})}

			<Button variant="outlined" onClick={handleAdd}>
				Добавить канал
			</Button>
		</Box>
	);
};
