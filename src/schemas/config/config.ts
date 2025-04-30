import { z } from 'zod';
import { adsConfigSchema } from './ads';
import { mainConfigSchema } from './main';
import { memberCommandsSchema } from './member-commands';

const ratingRolesSchema = z.object({
	ratingRoles: z.object({
		levels: z.array(
			z.object({
				from: z.number(),
				to: z.number(),
				rolesAdd: z.array(z.string()),
			})
		),
		resultChannelId: z.string(),
	}),
});

export const configSchema = z.object({})
	.merge(mainConfigSchema)
	.merge(ratingRolesSchema)
	.merge(adsConfigSchema)
	.merge(memberCommandsSchema);

export type TConfig = z.infer<typeof configSchema>;
