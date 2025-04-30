import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {}

export const PageLoading: React.FC<Props> = () => {
	return (
		<Box
			sx={{
				height: '70vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
			<Typography variant="body1" sx={{ mt: 2 }}>
				Загрузка...
			</Typography>
		</Box>
	);
};
