import {
	Box,
	Button,
	Typography,
} from '@mui/material';
import { useAppStore } from '../../store/useAppStore';
import { useState } from 'react';
import { setConfig } from '../../api/config';
import { configSchema, TConfig } from '../../schemas/config/config';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useThemeContext } from '../../theme/ThemeContext';
import { useAlertStore } from '../../store/useAlertStore';

interface Props { }
export const ConfigJSON: React.FC<Props> = () => {
	const { config, setLoading, setAppData } = useAppStore();
	const [ dirtyConfig, setDirtyConfig ] = useState<string>(JSON.stringify(config!, null, 2));
	const { isDark } = useThemeContext();
	const { showAlert } = useAlertStore();

	const handleSave = async () => {
		try {
			const parsedConfig = JSON.parse(dirtyConfig) as TConfig;
			setLoading(true);
			const newConfig = await setConfig(parsedConfig);
			setAppData(newConfig);
			showAlert('Настройки успешно сохранены', 'success');
		} catch (err) {
			showAlert((err instanceof Error ? err.message : ''), 'error');
		} finally {
			setLoading(false);
		}
	};

	const validateConfig = (config: string) => {
		try {
			const configObj: TConfig = JSON.parse(config);
			configSchema.parse(configObj);
		} catch (err) {
			showAlert(err instanceof Error ? err.message : '', 'error');
			throw err;
		}
	};

	const handleDownload = () => {
		validateConfig(dirtyConfig);
		const blob = new Blob([ dirtyConfig ], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'config.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<Box sx={{ width: '70vw', minWidth: 1100 }}>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Конфиг JSON
				</Typography>

				<Box sx={{ border: '1px solid #ccc', borderRadius: 1, my: 2 }}>
					<ReactCodeMirror
						value={dirtyConfig}
						height="70vh"
						extensions={[ json() ]}
						theme={isDark ? 'dark' : 'light'}
						onChange={(val) => setDirtyConfig(val)}
						style={{
							fontSize: '14px',
						}}
					/>
				</Box>

				<Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
					<Button variant="contained" onClick={handleSave}>
						Сохранить
					</Button>

					<Button variant="outlined" onClick={handleDownload}>
						Скачать JSON
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

