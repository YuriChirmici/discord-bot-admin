import { Container, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from './Settings';

interface Props {}
export const Content: React.FC<Props> = () => {
	return (
		<Container maxWidth="md">
			<Toolbar />

			<Routes>
				<Route path="/" element={<Settings />} />
			</Routes>
		</Container>
	);
};
