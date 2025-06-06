import { PrefixCommand, ConfigOptionTypes } from "@/types/command";

import { GuildMember, TextChannel, EmbedBuilder } from "discord.js";

export const TimeoutPrefix: PrefixCommand = {
	config: {
		name: "timeout",
		description: "Timeout a user",
		aliases: ["time", "t"],
		autoDelete: true,
		options: [
			{
				name: "member",
				type: ConfigOptionTypes.MEMBER,
			},
			{
				name: "minutes",
				type: ConfigOptionTypes.NUMBER,
				maxValue: 39999,
			},
		],
	},

	async execute(client, message, commandOptions, member: GuildMember, minutes: number) {
		if (member.user.bot) {
			commandOptions.channel.send("I cannot timeout this user");
		} else {
			try {
				if (minutes <= 0) {
					member.timeout(null);
				} else {
					var time = minutes * 60 * 1000;
					member.timeout(time);
				}
			} catch (err) {
				console.log(err);
				commandOptions.channel.send("I cannot timeout this user");
				return;
			}

			try {
				var timeoutEmbed = new EmbedBuilder()
					.setTitle("User Timed Out")
					.setColor(client.Colors.normal)
					.addFields(
						{
							name: "User",
							value: `<@${member.id}>\n${member.user.username}`,
						},
						{
							name: "Moderator",
							value: `<@${message.author.id}>\n${message.author.username}`,
						},
						{
							name: "Duration",
							value: `${minutes} minutes`,
						}
					);

				commandOptions.channel.send({ embeds: [timeoutEmbed] });
			} catch (err) {
				console.error(err);
			}
		}
	},
};
