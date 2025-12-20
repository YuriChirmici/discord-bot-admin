import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
	text: string;
	path: string;
	isActive: boolean;
}

export const MenuSubsection: React.FC<Props> = ({ text, path, isActive }) => {
	return (
		<ListItem disablePadding>
			<ListItemButton
				component={Link}
				to={path}
				selected={isActive}
				sx={{
					pl: 4,
					backgroundColor: isActive ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
				}}
			>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
};
