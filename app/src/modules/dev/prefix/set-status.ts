import { KiwiClient } from '@/client';
import { ConfigOptionTypes, PrefixCommand } from '@/types/command';
import { ActivityType } from 'discord.js';

export const SetStatusPrefix: PrefixCommand = {
	config: {
		name: 'set-status',
		description: 'Sets the status of the application',
		aliases: ['setstatus'],
		options: [
			{
				name: 'statusText',
				type: ConfigOptionTypes.TEXT,
				includeAfter: true,
			},
		],
	},
	async execute(client, message, commandOptions, statusText: string) {
		await client.user.setActivity(statusText, {
			type: ActivityType.Custom,
		});
		message.reply(`Status set to \`${statusText}\` successfully!`);
	},
};
