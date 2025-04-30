import { Box, CssBaseline, Toolbar, Typography, AppBar } from '@mui/material';
import { Menu } from './components/Menu';
import { Provider } from './components/Provider';
import { Content } from './components/Content';

const sections = [
	{ text: 'Основное', path: '/' },
	{ text: 'Настройки', path: '/settings' }
];

export default function App() {
	return (
		<Provider>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" sx={{ zIndex: 1201 }}>
					<Toolbar>
						<Typography variant="h6" noWrap>
							Панель управления
						</Typography>
					</Toolbar>
				</AppBar>

				<Menu sections={sections} />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Content />
				</Box>
			</Box>
		</Provider>
	);
}
