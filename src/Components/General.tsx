import {
	Autocomplete,
	TextField,
	Typography,
} from '@mui/material';
import PasswordInput from './ui/PasswordInput';
import { BaseConfigPageLayout } from './BaseConfigPageLayout';
import { TConfig } from '../schemas/config/config';
import { useEffect, useState } from 'react';

interface Props { }
export const General: React.FC<Props> = () => {
	const [ permissionsFlags, setPermissionsFlags ] = useState<string[]>([]);

	const validate = (dirtyConfig: TConfig) => {
		const { guildId, clientId, token, botMemberId } = dirtyConfig;
		if (!guildId || !clientId || !token || !botMemberId) {
			return { isValid: false, validationError: 'Заполните все поля' };
		}

		return { isValid: true };
	};

	useEffect(() => {
		const fetchPermissionsFlags = async () => {
			const flags = await window.ipcRenderer.invoke('get-discord-permissions-flags');
			setPermissionsFlags(flags);
		};
		fetchPermissionsFlags();
	});

	return (
		<BaseConfigPageLayout validate={validate}>
			{(dirtyConfig, setDirtyConfig) => (<>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Основное
				</Typography>

				<TextField
					label="ID сервера"
					fullWidth
					value={dirtyConfig.guildId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, guildId: e.target.value }))}
					sx={{ mb: 2 }}
					error={!dirtyConfig.guildId}
				/>

				<TextField
					label="Client ID"
					fullWidth
					value={dirtyConfig.clientId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, clientId: e.target.value }))}
					sx={{ mb: 2 }}
					error={!dirtyConfig.clientId}
				/>

				<PasswordInput
					label="Токен бота"
					fullWidth
					value={dirtyConfig.token}
					onValueChange={(token) => setDirtyConfig(({ ...dirtyConfig, token }))}
					sx={{ mb: 2 }}
					error={!dirtyConfig.token}
				/>

				<TextField
					label="ID бота"
					fullWidth
					value={dirtyConfig.botMemberId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, botMemberId: e.target.value }))}
					sx={{ mb: 2 }}
					error={!dirtyConfig.botMemberId}
				/>

				<Autocomplete
					options={permissionsFlags}
					value={dirtyConfig.commandsPermission}
					onChange={(_, val) => setDirtyConfig(({ ...dirtyConfig, commandsPermission: val || '' }))}
					sx={{ flex: 1 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Права доступа к командам"
							error={!dirtyConfig.commandsPermission}
						/>
					)}
				/>
			</>)}
		</BaseConfigPageLayout>
	);
};
