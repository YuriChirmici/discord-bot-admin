import { Box, Button } from '@mui/material';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { setConfig } from '../api/config';
import { TConfig } from '../schemas/config/config';

interface Props {
	children: (dirtyConfig: TConfig, setDirtyConfig: (config: TConfig) => void) => React.ReactNode;
	validate?: (config: TConfig) => void;
	sx?: React.CSSProperties;
}

export const BaseConfigPageLayout: React.FC<Props> = ({ children, validate, sx }) => {
	const { config, setLoading, setAppData } = useAppStore();
	const [ dirtyConfig, setDirtyConfig ] = useState<TConfig>(config!);

	const handleSave = async () => {
		try {
			const isValid = !validate || validate(dirtyConfig);
			if (!isValid) {
				return;
			}

			setLoading(true);
			const newConfig = await setConfig(dirtyConfig);
			setAppData(newConfig);
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto', p: 2, ...(sx || {}) }}>
			{children(dirtyConfig, setDirtyConfig)}

			<Box sx={{ display: 'flex', mt: 2 }}>
				<Button variant="contained" onClick={handleSave}>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
