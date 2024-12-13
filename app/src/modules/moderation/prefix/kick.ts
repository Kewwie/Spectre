import { PrefixCommand, ConfigOptionTypes } from '@/types/command';

import { checkPermissions } from '../utils/checkPermissions';
import { GuildMember, TextChannel } from 'discord.js';

/**
 * @type {PrefixCommand}
 */
export const KickPrefix: PrefixCommand = {
	config: {
		name: 'kick',
		description: 'Kick a user from the server',
		autoDelete: true,
		options: [
			{
				name: 'member',
				type: ConfigOptionTypes.MEMBER,
			},
		],
	},
	async checks(client, message, commandOptions) {
		return await checkPermissions(
			client,
			message.guildId,
			message.author.id
		);
	},
	async execute(client, message, commandOptions, member: GuildMember) {
		if (!member.kickable || member.user.bot) {
			var channel = message.channel as TextChannel;
			channel.send('I cannot kick this user');
		} else {
			member.kick().catch((err) => {});
		}
	},
};
