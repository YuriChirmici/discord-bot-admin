import { Typography } from '@mui/material';
import { BaseConfigPageLayout } from '../../BaseConfigPageLayout';
import { TConfig } from '../../../schemas/config/config';
import { RegimentsTable } from './RegimentsTable';

interface Props { }
export const Regiments: React.FC<Props> = () => {
	const validate = (dirtyConfig: TConfig) => {
		const regiments = dirtyConfig.regiments || [];
		const missingFields = regiments.find((r) => !r.name || !r.sheetLetter || !r.isExcluded && !r.shortName);
		if (missingFields) {
			return { isValid: false };
		}
		return { isValid: true };
	};

	return (<>
		<BaseConfigPageLayout validate={validate} sx={{ maxWidth: 1000 }}>
			{(dirtyConfig, setDirtyConfig) => (<>
				<Typography variant="h4" gutterBottom marginBottom={5}>
					Полки
				</Typography>

				<RegimentsTable
					regiments={dirtyConfig.regiments}
					setRegiments={(regiments) => setDirtyConfig(({ ...dirtyConfig, regiments }))}
				/>
			</>)}
		</BaseConfigPageLayout>
	</>);
};
