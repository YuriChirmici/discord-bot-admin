import { z } from 'zod';

export const rolesDividersSchema = z.object({
	rolesDividers: z.object({
		dividerRoleIds: z.array(z.string()).optional(),
		logsChannelId: z.string().optional(),
	}).optional(),
});
