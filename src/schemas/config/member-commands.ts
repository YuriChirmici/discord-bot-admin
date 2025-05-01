import { z } from 'zod';

const baseOptionData = z.object({
	text: z.string().optional(),
	emoji: z.string().optional(),
	description: z.string().optional(),
});

const buttonSchema = z.object({
	next: z.string().optional(),
	text: z.string().optional(),
	resultText: z.string().optional(),
	url: z.string().optional(),
	style: z.number().optional(),
	emoji: z.string().optional(),
	rolesAdd: z.array(z.string()).optional(),
	rolesRemove: z.array(z.string()).optional(),
	isSubmit: z.boolean().optional(),
	preserveBranch: z.boolean().optional(),
	hideInResult: z.boolean().optional(),
});

const selectOptionSchema = z.object({
	next: z.string().optional(),
	isDefault: z.boolean().optional(),
	text: z.string(),
	emoji: z.string().optional(),
	description: z.string().optional(),
	rolesAdd: z.array(z.string()).optional(),
	rolesRemove: z.array(z.string()).optional(),
	resultText: z.string().optional(),
	preserveBranch: z.boolean().optional(),
	hideInResult: z.boolean().optional(),
});

const modalItemSchema = z.object({
	key: z.string().optional(),
	style: z.number().optional(),
	label: z.string(),
	resultText: z.string().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	placeholder: z.string().optional(),
	value: z.string().optional(),
	required: z.boolean().optional(),
	preserveBranch: z.boolean().optional(),
});

const modalSchema = z.object({
	title: z.string(),
	items: z.array(modalItemSchema),
});

const selectSchema = z.object({
	placeholder: z.string().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	options: z.array(selectOptionSchema),
});

const questionSchema = z.object({
	id: z.string(),
	isStart: z.boolean().optional(),
	hideInResult: z.boolean().optional(),
	isSubmit: z.boolean().optional(),
	text: z.string(),
	next: z.string().optional(),
	skipAnswer: z.boolean().optional(),
	withTextAnswer: z.boolean().optional(),
	textAnswerKey: z.string().optional(),
	resultText: z.string().optional(),
	buttons: z.array(z.array(buttonSchema)).optional(),
	select: selectSchema.optional(),
	modal: modalSchema.optional(),
});

const baseCommandSchema = z.object({
	name: z.string(),
	hideInAd: z.boolean().optional(),
	optionData: baseOptionData.optional(),
});

const formCommand = baseCommandSchema.extend({
	type: z.literal('form'),
	parentChannelId: z.string().optional(),
	channelName: z.string(),
	initialRoles: z.array(z.string()),
	resultHeader: z.string(),
	resultChannelId: z.string(),
	kickExceptionRoles: z.array(z.string()),
	questions: z.array(questionSchema),
});

const modalCommand = baseCommandSchema.extend({
	type: z.literal('modal'),
	parentChannelId: z.string().optional(),
	resultHeader: z.string(),
	resultChannelId: z.string(),
	userReplyResult: z.string(),
	vacationRoles: z.array(z.string()),
	modal: modalSchema,
});

const actionCommand = baseCommandSchema.extend({
	type: z.literal('action'),
});

export const memberCommandsSchema = z.object({
	memberCommands: z.array(z.discriminatedUnion('type', [ formCommand, modalCommand, actionCommand ])),
});
