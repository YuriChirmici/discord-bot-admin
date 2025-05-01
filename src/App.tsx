import { Box, CssBaseline } from '@mui/material';
import { Menu } from './components/Menu';
import { Provider } from './components/Provider';
import { Content } from './components/Content';
import { useAppStore } from './store/useAppStore';
import { useMenu } from './hooks/useMenu';
import { useEffect } from 'react';
import { PageLoading } from './components/PageLoading';
import { IAppData } from './store/app-store-types';
import { AppToolbar } from './components/Toolbar';
import { FullscreenLoader } from './components/OverlayLoader';

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
				<CssBaseline />

				<AppToolbar />

				<Menu sections={sections} />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Content />
				</Box>

				<FullscreenLoader />
			</Box>
		</Provider>
	);
}
