import React from 'react';
import { Button, Box } from '@mui/material';
import { uploadConfigFile } from '../api/config';

interface Props {
	className?: string;
}

export const ConfigFileUpload: React.FC<Props> = () => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const json = JSON.parse(e.target?.result as string);

				await uploadConfigFile(json);
				alert('Конфиг файл успешно загружен');
			} catch (err) {
				alert('Ошибка парсинга JSON: ' + (err instanceof Error ? err.message : ''));
			}
		};

		reader.readAsText(file);

		console.log(file);
	};

	return (
		<Box sx={{ paddingBottom: 3 }}>
			<input
				accept=".json"
				style={{ display: 'none' }}
				id="file-upload"
				type="file"
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
