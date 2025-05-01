import { Drawer, List, ListItem, ListItemText, Toolbar, ListItemButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
	sections: {
		text: string;
		path: string;
	}[];
}

export const Menu: React.FC<Props> = ({ sections }) => {
	const location = useLocation();
	const isActive = (path: string) => location.pathname === path;

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
			}}
		>
			<Toolbar />
			<List>
				{sections.map(({ text, path }) => (
					<ListItem key={text} disablePadding>
						<ListItemButton
							component={Link}
							to={path}
							selected={isActive(path)}
							sx={{
								backgroundColor: isActive(path) ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
							}}
						>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};
