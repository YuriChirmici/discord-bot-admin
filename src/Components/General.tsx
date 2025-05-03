import {
	TextField,
	Typography,
} from '@mui/material';
import PasswordInput from './ui/PasswordInput';
import { BaseConfigPageLayout } from './BaseConfigPageLayout';

interface Props { }
export const General: React.FC<Props> = () => {
	return (
		<BaseConfigPageLayout>
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
				/>

				<TextField
					label="Client ID"
					fullWidth
					value={dirtyConfig.clientId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, clientId: e.target.value }))}
					sx={{ mb: 2 }}
				/>

				<PasswordInput
					label="Токен бота"
					fullWidth
					value={dirtyConfig.token}
					onValueChange={(token) => setDirtyConfig(({ ...dirtyConfig, token }))}
					sx={{ mb: 2 }}
				/>

				<TextField
					label="ID бота"
					fullWidth
					value={dirtyConfig.botMemberId}
					onChange={(e) => setDirtyConfig(({ ...dirtyConfig, botMemberId: e.target.value }))}
					sx={{ mb: 2 }}
				/>
			</>)}
		</BaseConfigPageLayout>
	);
};
