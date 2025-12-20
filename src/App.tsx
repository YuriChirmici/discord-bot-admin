import { Box } from '@mui/material';
import { Menu } from './components/menu/index';
import { Provider } from './components/Provider';
import { Content } from './components/Content';
import { useAppStore } from './store/useAppStore';
import { useMenu } from './hooks/useMenu';
import { useEffect } from 'react';
import { PageLoading } from './components/PageLoading';
import { IAppData } from './store/types/app-store-types';
import { AppToolbar } from './components/Toolbar';

export default function App() {
	const { serverReady, setServerReady, config, setAppData } = useAppStore();
	const { sections } = useMenu(config);

	useEffect(() => {
		window.ipcRenderer.send('renderer-ready');
	}, []);

	useEffect(() => {
		window.ipcRenderer.on('server-initialized', (_, data: { appData: IAppData }) => {
			console.log('Server initialized');
			setAppData(data.appData);
			setServerReady(true);
		});
	}, []);

	if (!serverReady) {
		return <PageLoading />;
	}

	return (
		<Provider>
			<Box sx={{ display: 'flex' }}>
				<AppToolbar />

				<Menu sections={sections} />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Content />
				</Box>
			</Box>
		</Provider>
	);
}
