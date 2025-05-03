import { Container, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from './sections/Settings';
import { General } from './sections/General';
import { ConfigJSON } from './sections/ConfigJSON';
import { TempVoice } from './sections/temp-voice/TempVoice';
import { Slots } from './sections/slots/Slots';

interface Props {}
export const Content: React.FC<Props> = () => {
	return (
		<Container maxWidth="md">
			<Toolbar />

			<Routes>
				<Route path="/" element={<Settings />} />
				<Route path="/general" element={<General />} />
				<Route path="/config-json" element={<ConfigJSON />} />
				<Route path="/temp-voice" element={<TempVoice />} />
				<Route path="/slots" element={<Slots />} />
			</Routes>
		</Container>
	);
};
