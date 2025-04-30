import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from './Settings';
import { getConfig } from '../api/config';
import { useEffect, useState } from 'react';
import { TConfig } from '../schemas/config/config';

interface Props {}

export const Content: React.FC<Props> = () => {
	const [ config, setConfig ] = useState<TConfig | null>();

	useEffect(() => {
		getConfig().then(setConfig);
	}, []);

	return (
		<Container maxWidth="md">
			<Routes>
				{config?.clientId && (<>
					{/* <Route path="/roles" element={<RolesList roles={roles} />} /> */}
				</>)}
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</Container>
	);
};
