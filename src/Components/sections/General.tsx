import {
	Autocomplete,
	TextField,
	Typography,
} from '@mui/material';
import PasswordInput from '../ui/PasswordInput';
import { BaseConfigPageLayout } from '../BaseConfigPageLayout';
import { TConfig } from '../../schemas/config/config';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Props { }
export const General: React.FC<Props> = () => {
	const [ permissionsFlags, setPermissionsFlags ] = useState<string[]>([]);
	const { channels } = useAppStore();

	const validate = (dirtyConfig: TConfig) => {
		const { guildId, clientId, token, botMemberId, errorsChannelId, sheetMembersChannelId } = dirtyConfig;
		if (!guildId || !clientId || !token || !botMemberId || !errorsChannelId || !sheetMembersChannelId || !permissionsFlags) {
			return { isValid: false };
		}

		return { isValid: true };
	};

	useEffect(() => {
		const fetchPermissionsFlags = async () => {
			const flags = await window.ipcRenderer.invoke('get-discord-permissions-flags');
			setPermissionsFlags(flags);
		};
		fetchPermissionsFlags();
	}, []);

	return (
		<BaseConfigPageLayout validate={validate}>
			{(dirtyConfig, setDirtyConfig) => (<>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Основное
				</Typography>

				<TextField
					label="ID Дискорд сервера"
					fullWidth
					value={dirtyConfig.guildId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, guildId: e.target.value }))}
					sx={{ mb: 3 }}
					error={!dirtyConfig.guildId}
				/>

				<TextField
					label="Client ID"
					fullWidth
					value={dirtyConfig.clientId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, clientId: e.target.value }))}
					sx={{ mb: 3 }}
					error={!dirtyConfig.clientId}
				/>

				<PasswordInput
					label="Токен бота"
					fullWidth
					value={dirtyConfig.token}
					onValueChange={(token) => setDirtyConfig(({ ...dirtyConfig, token }))}
					sx={{ mb: 3 }}
					error={!dirtyConfig.token}
				/>

				<TextField
					label="ID бота"
					fullWidth
					value={dirtyConfig.botMemberId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, botMemberId: e.target.value }))}
					sx={{ mb: 3 }}
					error={!dirtyConfig.botMemberId}
				/>

				<Autocomplete
					options={permissionsFlags}
					value={dirtyConfig.commandsPermission}
					onChange={(_, val) => setDirtyConfig(({ ...dirtyConfig, commandsPermission: val || '' }))}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Права доступа к командам"
							error={!dirtyConfig.commandsPermission}
						/>
					)}
				/>

				<Autocomplete
					options={channels.filter(c => c.type === 0)}
					getOptionLabel={(option) => option.name}
					getOptionKey={(option => option.id)}
					value={channels.find(c => c.id === dirtyConfig.errorsChannelId) || null}
					onChange={(_, val) => setDirtyConfig(({ ...dirtyConfig, errorsChannelId: val?.id || '' }))}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Канал ошибок"
							error={!dirtyConfig.errorsChannelId}
						/>
					)}
				/>

				<Autocomplete
					options={channels.filter(c => c.type === 0)}
					getOptionLabel={(option) => option.name}
					getOptionKey={(option => option.id)}
					value={channels.find(c => c.id === dirtyConfig.sheetMembersChannelId) || null}
					onChange={(_, val) => setDirtyConfig(({ ...dirtyConfig, sheetMembersChannelId: val?.id || '' }))}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Канал слотов"
							error={!dirtyConfig.sheetMembersChannelId}
						/>
					)}
				/>
			</>)}
		</BaseConfigPageLayout>
	);
};
