import { Box, Button, Checkbox, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from '../../../store/useAppStore';
import { TConfig } from '../../../schemas/config/config';

type TVoiceConnection = TConfig['voiceConnections'][number];

interface Props {
	config: TConfig;
	onChange: (value: TVoiceConnection[]) => void;
}

export const VoiceConnectionsEditor: React.FC<Props> = ({ config, onChange }) => {
	const { channels } = useAppStore();

	const voiceChannels = channels.filter(c => c.type === 2);
	const categoryChannels = channels.filter(c => c.type === 4);

	const voiceConnections = (config?.voiceConnections || []).map((c) => ({
		channelId: c.channelId || '',
		categoryId: c.categoryId || '',
		channelName: c.channelName || '',
		isPrivate: c.isPrivate ?? false,
		position: c.position || 'bottom',
	})) as TVoiceConnection[];

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
				channelName: '',
				isPrivate: false,
				position: 'bottom',
			}
		]);
	};

	const handleUpdate = (channelId: string, updated: TVoiceConnection) => {
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
					<Box key={conn.channelId} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
						<Autocomplete
							options={voiceChannels.filter(c => c.id === conn.channelId || !voiceConnections.find(v => v.channelId === c.id))}
							getOptionLabel={(option) => option.name}
							getOptionKey={(option => option.id)}
							value={selectedChannel}
							onChange={(_, newValue) => handleUpdate(conn.channelId, { ...conn, channelId: newValue?.id || '' })}
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
							getOptionKey={(option => option.id)}
							value={selectedCategory}
							onChange={(_, newValue) => handleUpdate(conn.channelId, { ...conn, categoryId: newValue?.id || '' })}
							sx={{ flex: 1 }}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Вкладка"
									error={!conn.categoryId}
								/>
							)}
						/>

						<Box sx={{ mt: '-12px' }}>
							<Typography variant="caption" display="block" gutterBottom>
								Позиция
							</Typography>
							<ToggleButtonGroup
								size="small"
								value={conn.position}
								exclusive
								onChange={(_, v) => handleUpdate(conn.channelId, { ...conn, position: v })}
							>
								<ToggleButton value="top">↑</ToggleButton>
								<ToggleButton value="bottom">↓</ToggleButton>
							</ToggleButtonGroup>
						</Box>

						<TextField
							label="Название созданного канала"
							value={conn.channelName}
							onChange={(e) => handleUpdate(conn.channelId, { ...conn, channelName: e.target.value })}
							sx={{ flex: 1 }}
							error={!conn.channelName}
						/>

						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<Typography variant="caption" display="block" gutterBottom>
								Приватный
							</Typography>
							<Checkbox
								size="small"
								checked={conn.isPrivate}
								onChange={(e) => {
									handleUpdate(conn.channelId, { ...conn, isPrivate: e.target.checked });
								}}
							/>
						</Box>

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
