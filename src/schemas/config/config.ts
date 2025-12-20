import { z } from 'zod';
import { adsConfigSchema } from './ads';
import { mainConfigSchema } from './main';
import { memberCommandsSchema } from './member-commands';
import { rolesDividersSchema } from './roles-dividers';

const ratingRolesSchema = z.object({
	ratingRoles: z.object({
		levels: z.array(
			z.object({
				from: z.number(),
				to: z.number(),
				rolesAdd: z.array(z.string()),
			})
		),
		resultChannelId: z.string().min(1),
	}),
});

export const configSchema = z.object({})
	.merge(mainConfigSchema)
	.merge(ratingRolesSchema)
	.merge(adsConfigSchema)
	.merge(memberCommandsSchema)
	.merge(rolesDividersSchema);

export type TConfig = z.infer<typeof configSchema>;

export const localConfigSchema = z.object({
	database: z.object({
		connectionLink: z.string().min(1),
	}),
});

export type TLocalConfig = z.infer<typeof localConfigSchema>;

