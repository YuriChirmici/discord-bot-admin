import { z } from 'zod';

export const mainConfigSchema = z.object({
	token: z.string(),
	clientId: z.string(),
	guildId: z.string(),
	botMemberId: z.string(),

	database: z.object({
		connectionLink: z.string(),
	}),

	commandsPermission: z.string(),

	voiceConnections: z.array(
		z.object({
			channelId: z.string(),
			categoryId: z.string(),
			channelName: z.string(),
		})
	),

	errorsChannelId: z.string(),

	deletedMessagesLogging: z.object({
		channelId: z.string(),
		channelExceptions: z.array(z.string()),
		rolesExceptions: z.array(z.string()),
		savedFileMaxSizeMB: z.number(),
		savedFolderMaxSizeMB: z.number(),
	}),

	sheetMembersChannelId: z.string(),
	sheetValidationCode: z.string(),

	regiments: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			sheetLetter: z.string().length(1),
			shortName: z.string().optional(),
			shouldUpdateRatingRoles: z.boolean().optional(),
			gamesTrackingEnabled: z.boolean().optional(),
			isExcluded: z.boolean().optional(),
		})
	),

	inactiveRoles: z.array(z.string()),

	gameTracking: z.object({
		trackingChannels: z.array(z.string()),
		trackingRoles: z.array(z.string()),
		resultChannelId: z.string(),
		replayFetchCookie: z.string(),
	}),
});
