import { BaseConfigPageLayout } from '../../BaseConfigPageLayout';
import { VoiceConnectionsEditor } from './VoiceConnectionsEditor';
import { TConfig } from '../../../schemas/config/config';

interface Props {}
export const TempVoice: React.FC<Props> = () => {

	const validate = (dirtyConfig: TConfig) => {
		const voiceConnections = dirtyConfig.voiceConnections || [];
		const missingFields = voiceConnections.find((c) => !c.channelId || !c.categoryId || !c.channelName);
		if (missingFields) {
			return { isValid: false };
		}

		return { isValid: true };
	};

	return (
		<BaseConfigPageLayout sx={{ maxWidth: 900 }} validate={validate}>
			{(dirtyConfig, setDirtyConfig) => (
				<>
					<VoiceConnectionsEditor config={dirtyConfig} onChange={(voiceConnections) => setDirtyConfig(({ ...dirtyConfig, voiceConnections }))} />
				</>
			)}
		</BaseConfigPageLayout>
	);
};
