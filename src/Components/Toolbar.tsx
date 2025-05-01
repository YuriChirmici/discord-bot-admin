import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

interface Props { }
export const AppToolbar: React.FC<Props> = () => {
	const { botInfo } = useAppStore();

	return (
		<AppBar position="fixed" sx={{ zIndex: 1201 }}>
			<Toolbar>
				<Typography variant="h6" noWrap>
					Панель управления
					{ botInfo?.tag ? ` - ${botInfo.tag}` : '' }
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
