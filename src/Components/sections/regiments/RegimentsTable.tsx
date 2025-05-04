import {
	Table, TableBody, TableCell, TableContainer,
	TableHead, TableRow, Paper, Switch,
	TextField,
	Link
} from '@mui/material';
import { TConfig } from '../../../schemas/config/config';

interface Props {
	regiments: TConfig['regiments'];
	setRegiments: (regiments: TConfig['regiments']) => void;
}
export const RegimentsTable: React.FC<Props> = ({ regiments, setRegiments }) => {
	const handleChange = (index: number, field: string, value: any) => {
		const updated = [ ...regiments ];
		updated[index] = { ...updated[index], [field]: value };
		setRegiments(updated);
	};

	return (
		<TableContainer component={Paper} sx={{ marginBottom: 2 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Название</TableCell>
						<TableCell>Буква</TableCell>
						<TableCell>Тэг</TableCell>
						<TableCell>Обновлять роли</TableCell>
						<TableCell>Трекинг игр</TableCell>
						<TableCell>Исключённые</TableCell>
						<TableCell>Ссылка</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{regiments.map((regiment, index) => (
						<TableRow key={regiment.id}>
							<TableCell sx={{ minWidth: 240 }}>
								<TextField
									value={regiment.name}
									onChange={(e) => handleChange(index, 'name', e.target.value)}
									error={!regiment.name}
								/>
							</TableCell>
							<TableCell sx={{ maxWidth: 60 }}>
								<TextField
									value={regiment.sheetLetter}
									onChange={(e) => handleChange(index, 'sheetLetter', e.target.value)}
									inputProps={{ maxLength: 1 }}
									size="small"
									error={!regiment.sheetLetter}
								/>
							</TableCell>
							<TableCell sx={{ maxWidth: 140 }}>
								<TextField
									value={regiment.shortName || ''}
									onChange={(e) => handleChange(index, 'shortName', e.target.value)}
									size="small"
									error={!regiment.isExcluded && !regiment.shortName}
								/>
							</TableCell>
							<TableCell>
								<Switch
									checked={!!regiment.shouldUpdateRatingRoles}
									onChange={(e) => handleChange(index, 'shouldUpdateRatingRoles', e.target.checked)}
								/>
							</TableCell>
							<TableCell>
								<Switch
									checked={!!regiment.gamesTrackingEnabled}
									onChange={(e) => handleChange(index, 'gamesTrackingEnabled', e.target.checked)}
								/>
							</TableCell>
							<TableCell>
								<Switch
									checked={!!regiment.isExcluded}
									onChange={(e) => handleChange(index, 'isExcluded', e.target.checked)}
								/>
							</TableCell>
							<TableCell>
								{regiment.name && !regiment.isExcluded && (
									<Link
										target="_blank"
										rel="noopener noreferrer"
										underline="hover"
										onClick={(e) => {
											e.preventDefault();
											window.ipcRenderer.openExternal(`https://warthunder.com/ru/community/claninfo/${encodeURIComponent(regiment.name)}`);
										}}
										sx={{ cursor: 'pointer' }}
									>
										Открыть
									</Link>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
