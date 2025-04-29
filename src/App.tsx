import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, Container, Toolbar, Typography, AppBar } from '@mui/material';
import { Menu } from './Components/Menu';
import { Settings } from './Components/Settings';

const sections = [
	{ text: 'Основное', path: '/' },
	{ text: 'Настройки', path: '/settings' }
];

export default function App() {
	return (
		<Router>
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
					<Container maxWidth="md">
						<Toolbar />

						<Routes>
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</Container>
				</Box>
			</Box>
		</Router>
	);
}
