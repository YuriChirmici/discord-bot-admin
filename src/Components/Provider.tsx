import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../theme/ThemeContext';

interface Props {}

export const Provider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
	return (
		<Router>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</Router>
	);
};
