import { BaseConfigPageLayout } from './BaseConfigPageLayout';
import { VoiceConnectionsEditor } from './VoiceConnectionsEditor';
import { TConfig } from '../schemas/config/config';

interface Props {}
export const TempVoice: React.FC<Props> = () => {
	const validate = (dirtyConfig: TConfig) => {
		const voiceConnections = dirtyConfig.voiceConnections || [];
		const missingFields = voiceConnections.find((c) => !c.channelId || !c.categoryId || !c.channelName);
		if (missingFields) {
			alert('Заполните все поля');
			return false;
		}

		return true;
	};

	return (
		<BaseConfigPageLayout sx={{ maxWidth: 1100 }} validate={validate}>
			{(dirtyConfig, setDirtyConfig) => (
				<>
					<VoiceConnectionsEditor config={dirtyConfig} onChange={(voiceConnections) => setDirtyConfig(({ ...dirtyConfig, voiceConnections }))} />
				</>
			)}
		</BaseConfigPageLayout>
	);
};
