import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../theme/ThemeContext';
import { CssBaseline } from '@mui/material';
import { FullscreenLoader } from './OverlayLoader';
import { GlobalAlert } from './GlobalAlert';

interface Props {}

export const Provider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
	return (
		<Router>
			<ThemeProvider>
				<CssBaseline />
				<FullscreenLoader />
				<GlobalAlert />
				{children}
			</ThemeProvider>
		</Router>
	);
};
