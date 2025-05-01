import { Container, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from './Settings';
import { General } from './General';
import { ConfigJSON } from './ConfigJSON';

interface Props {}
export const Content: React.FC<Props> = () => {
	return (
		<Container maxWidth="md">
			<Toolbar />

			<Routes>
				<Route path="/" element={<Settings />} />
				<Route path="/general" element={<General />} />
				<Route path="/config-json" element={<ConfigJSON />} />
			</Routes>
		</Container>
	);
};
