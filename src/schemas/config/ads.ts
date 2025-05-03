import { z } from 'zod';

const attendanceAdSchema = z.object({
	type: z.literal('attendance'),
	name: z.string().min(1),
	defaults: z.object({
		timer: z.number().optional(),
		channelId: z.string().optional(),
		title: z.string().optional(),
		text: z.string().optional(),
		content: z.string().optional(),
		time: z.string().optional(),
	}),
	ratings: z.array(z.string()),
	firstWeekLength: z.number(),
	statisticsData: z.object({
		rolesSelectors: z.array(z.string()),
		rolesExceptions: z.array(z.string()),
	}),
	multipleRoles: z.boolean().optional(),
	buttons: z.array(
		z.array(
			z.object({
				rolesAdd: z.array(z.string()),
				emoji: z.string().min(1),
				save: z.boolean().optional(),
			})
		)
	),
});

const rolesUsualAdSchema = z.object({
	type: z.literal('rolesUsual'),
	name: z.string().min(1),
	multipleRoles: z.boolean().optional(),
	resultChannelId: z.string().min(1),
	defaults: z.object({
		channelId: z.string().optional(),
		title: z.string().optional(),
		text: z.string().optional(),
		content: z.string().optional(),
	}),
	buttons: z.array(
		z.array(
			z.object({
				rolesAdd: z.array(z.string()),
				emoji: z.string().optional(),
				text: z.string().optional(),
			})
		)
	),
});

const memberCommandsAdSchema = z.object({
	type: z.literal('memberCommands'),
	name: z.string().min(1),
	defaults: z.object({
		channelId: z.string().optional(),
		title: z.string().optional(),
		text: z.string().optional(),
		content: z.string().optional(),
	}),
	select: z.object({
		placeholder: z.string().optional(),
	}),
});

export const adsConfigSchema = z.object({
	adsConfig: z.object({
		ads: z.array(z.discriminatedUnion('type', [ attendanceAdSchema, rolesUsualAdSchema, memberCommandsAdSchema ])),
		borderColor: z.tuple([ z.number(), z.number(), z.number() ]),
	}),
});
