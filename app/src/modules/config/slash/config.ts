import { KiwiClient } from '@/client';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '@/types/command';

import { getPage } from '../utils/getPage';

/**
 * @type {SlashCommand}
 */
export const ConfigSlash: SlashCommand = {
	config: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Manage server coniguration'),

	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {KiwiClient} client
	 */
	async execute(
		interaction: ChatInputCommandInteraction,
		client: KiwiClient
	): Promise<void> {
		var page = await getPage(client, {
			guildId: interaction.guildId,
			module: 'activity',
			option: 'overview',
			pageOwner: interaction.user,
		});

		interaction.reply({
			embeds: [...page.embeds],
			components: [...page.rows],
		});
	},
};
