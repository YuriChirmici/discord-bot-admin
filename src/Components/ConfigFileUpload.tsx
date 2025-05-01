import React, { useRef } from 'react';
import { Button, Box } from '@mui/material';
import { setConfig } from '../api/config';
import { useAppStore } from '../store/useAppStore';

interface Props {
	className?: string;
}

export const ConfigFileUpload: React.FC<Props> = () => {
	const { setAppData, setLoading } = useAppStore();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (!file) {
			return;
		}

		setLoading(true);
		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const json = JSON.parse(e.target?.result as string);

				const newData = await setConfig(json);
				setAppData(newData);
			} catch (err) {
				alert('Ошибка парсинга JSON: ' + (err instanceof Error ? err.message : ''));
			} finally {
				setLoading(false);
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
			}
		};

		reader.readAsText(file);
	};

	return (
		<Box sx={{ paddingBottom: 3 }}>
			<input
				accept=".json"
				style={{ display: 'none' }}
				id="file-upload"
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
			/>
			<label htmlFor="file-upload">
				<Button
					variant="contained"
					component="span"
					sx={{
						width: 'auto',
						height: 'auto',
						padding: '7px 19px',
					}}
				>
					Загрузить конфиг файл
				</Button>
			</label>
		</Box>
	);
};
