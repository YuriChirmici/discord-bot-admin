import { Backdrop, CircularProgress } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

interface Props { }
export const FullscreenLoader: React.FC<Props> = () => {
	const { loading } = useAppStore();

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
