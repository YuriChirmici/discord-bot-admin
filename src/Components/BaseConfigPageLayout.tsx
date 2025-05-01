import { Box, Button } from '@mui/material';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { setConfig } from '../api/config';
import { TConfig } from '../schemas/config/config';

interface Props {
	children: (dirtyConfig: TConfig, setDirtyConfig: (config: TConfig) => void) => React.ReactNode;
	maxWidth?: number;
	validate?: (config: TConfig) => void;
}

export const BaseConfigPageLayout: React.FC<Props> = ({ children, maxWidth = 600, validate }) => {
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
		<Box sx={{ display: 'flex', flexDirection: 'column', maxWidth, mx: 'auto', p: 2 }}>
			{children(dirtyConfig, setDirtyConfig)}

			<Box sx={{ display: 'flex', mt: 3 }}>
				<Button variant="contained" onClick={handleSave}>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
