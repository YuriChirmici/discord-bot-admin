import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({
	toggleTheme: () => {},
	isDark: false,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [ isDark, setIsDark ] = useState(true);

	const toggleTheme = () => setIsDark(prev => !prev);

	const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [ isDark ]);

	return (
		<ThemeContext.Provider value={{ toggleTheme, isDark }}>
			<MuiThemeProvider theme={theme}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};
