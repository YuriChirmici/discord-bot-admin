import { TextField, Typography, Autocomplete, Slider } from '@mui/material';
import { BaseConfigPageLayout } from '../BaseConfigPageLayout';
import { TConfig } from '../../schemas/config/config';
import { useAppStore } from '../../store/useAppStore';

interface Props { }
export const DeletedMessages: React.FC<Props> = () => {
	const { channels, roles } = useAppStore();

	const validate = (dirtyConfig: TConfig) => {
		const { channelId } = dirtyConfig.deletedMessagesLogging;
		if (!channelId) {
			return { isValid: false };
		}

		return { isValid: true };
	};

	const fileStats = {
		min: 1,
		max: 30,
		step: 1,
		defaultValue: 5,
		marks: [ 1, 10, 20, 30 ].map((value) => ({
			value,
			label: `${value}MB`,
		})),
	};

	const folderStats = {
		min: 50,
		max: 2000,
		step: 50,
		defaultValue: 500,
		marks: [ 50, 500, 1000, 1500, 2000 ].map((value) => ({
			value,
			label: `${value}MB`,
		})),
	};

	return (
		<BaseConfigPageLayout validate={validate}>
			{(dirtyConfig, setDirtyConfig) => {
				const messagesConfig = dirtyConfig.deletedMessagesLogging;
				const onFieldChange = (field: keyof typeof messagesConfig, value: any) => {
					const newConfig = {
						...dirtyConfig,
						deletedMessagesLogging: {
							...messagesConfig,
							[field]: value,
						},
					};

					if (field === 'channelId' && !messagesConfig.channelExceptions.includes(value)) {
						newConfig.deletedMessagesLogging.channelExceptions.push(value);
					}

					setDirtyConfig(newConfig);
				};

				const onChangeChannelExceptions = (value: string[]) => {
					if (messagesConfig.channelId && !value.includes(messagesConfig.channelId)) {
						value.push(messagesConfig.channelId);
					}

					value = Array.from(new Set(value));
					onFieldChange('channelExceptions', value);
				};

				return (<>
					<Typography variant="h4" gutterBottom marginBottom={5}>
						Удаленные сообщения
					</Typography>

					<Autocomplete
						options={channels.filter(c => c.type === 0)}
						getOptionLabel={(option) => option.name}
						getOptionKey={(option => option.id)}
						value={channels.find(c => c.id === messagesConfig.channelId) || null}
						onChange={(_, val) => onFieldChange('channelId', val?.id || '')}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Канал для логов"
								error={!messagesConfig.channelId}
							/>
						)}
						sx={{ mb: 3 }}
					/>

					<Autocomplete
						multiple
						options={channels}
						getOptionLabel={(option) => option.name}
						getOptionKey={(option => option.id)}
						value={channels.filter(c => messagesConfig.channelExceptions.includes(c.id))}
						onChange={(_, selected) => onChangeChannelExceptions(selected.map((c) => c.id))}
						renderInput={(params) => <TextField {...params} label="Исключения каналов" />}
						sx={{ mb: 3 }}
					/>

					<Autocomplete
						multiple
						options={roles}
						getOptionLabel={(option) => option.name}
						getOptionKey={(option => option.id)}
						value={roles.filter(c => messagesConfig.rolesExceptions.includes(c.id))}
						onChange={(_, selected) => onFieldChange('rolesExceptions', selected.map((c) => c.id))}
						renderInput={(params) => <TextField {...params} label="Исключения ролей" />}
						sx={{ mb: 4 }}
					/>

					<Typography gutterBottom>Макс. размер файла (MB)</Typography>
					<Slider
						value={messagesConfig.savedFileMaxSizeMB || fileStats.defaultValue}
						onChange={(_, val) => onFieldChange('savedFileMaxSizeMB', Number(val))}
						min={fileStats.min}
						max={fileStats.max}
						step={fileStats.step}
						marks={fileStats.marks}
						valueLabelDisplay="auto"
						sx={{ mb: 6 }}
					/>

					<Typography gutterBottom>Макс. размер папки (MB)</Typography>
					<Slider
						value={messagesConfig.savedFolderMaxSizeMB || folderStats.defaultValue}
						onChange={(_, val) => onFieldChange('savedFolderMaxSizeMB', Number(val))}
						min={folderStats.min}
						max={folderStats.max}
						step={folderStats.step}
						marks={folderStats.marks}
						valueLabelDisplay="auto"
						sx={{ mb: 5 }}
					/>
				</>);
			}}
		</BaseConfigPageLayout>
	);
};
