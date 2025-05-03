import { z } from 'zod';

export const mainConfigSchema = z.object({
	token: z.string().min(1),
	clientId: z.string().min(1),
	guildId: z.string().min(1),
	botMemberId: z.string().min(1),

	database: z.object({
		connectionLink: z.string().min(1),
	}),

	commandsPermission: z.string().min(1),

	voiceConnections: z.array( // async
		z.object({
			channelId: z.string().min(1),
			categoryId: z.string().min(1),
			channelName: z.string().min(2),
		})
	),

	errorsChannelId: z.string().min(1),

	deletedMessagesLogging: z.object({
		channelId: z.string().min(1),
		channelExceptions: z.array(z.string()),
		rolesExceptions: z.array(z.string()),
		savedFileMaxSizeMB: z.number(),
		savedFolderMaxSizeMB: z.number(),
	}),

	sheetMembersChannelId: z.string().min(1),
	sheetValidationCode: z.string().min(1),

	regiments: z.array(
		z.object({
			id: z.number(),
			name: z.string().min(1),
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
		resultChannelId: z.string().min(1),
	}),
});
