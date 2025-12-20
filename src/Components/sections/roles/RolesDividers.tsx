import {
	Typography,
	Autocomplete,
	TextField,
} from '@mui/material';
import { BaseConfigPageLayout } from '../../BaseConfigPageLayout';
import { useAppStore } from '../../../store/useAppStore';

interface Props { }
export const RolesDividers: React.FC<Props> = () => {
	const { roles, channels } = useAppStore();
	const textChannels = channels.filter(c => c.type === 0);

	return (
		<BaseConfigPageLayout>
			{(dirtyConfig, setDirtyConfig) => (<>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Разделители ролей
				</Typography>

				<Autocomplete
					multiple
					options={roles}
					getOptionLabel={(option) => option.name}
					getOptionKey={(option) => option.id}
					value={roles.filter(r => (dirtyConfig.rolesDividers?.dividerRoleIds || []).includes(r.id))}
					onChange={(_, selectedRoles) => setDirtyConfig({
						...dirtyConfig,
						rolesDividers: {
							...(dirtyConfig.rolesDividers || {}),
							dividerRoleIds: selectedRoles.map(r => r.id)
						}
					})}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Разделяющие роли"
							placeholder="Выберите роли"
						/>
					)}
				/>

				<Autocomplete
					options={textChannels}
					getOptionLabel={(option) => option.name}
					getOptionKey={(option) => option.id}
					value={textChannels.find(c => c.id === dirtyConfig.rolesDividers?.logsChannelId) || null}
					onChange={(_, val) => setDirtyConfig({
						...dirtyConfig,
						rolesDividers: {
							...(dirtyConfig.rolesDividers || {}),
							logsChannelId: val?.id || ''
						}
					})}
					sx={{ mb: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Текстовый канал для вывода логов"
							placeholder="Выберите канал"
						/>
					)}
				/>
			</>)}
		</BaseConfigPageLayout>
	);
};
