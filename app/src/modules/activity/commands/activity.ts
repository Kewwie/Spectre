import { KiwiClient } from "../../../client";

import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    StringSelectMenuBuilder
} from "discord.js";
import { SlashCommand } from "../../../types/command";

import { ActivitySelectMenu } from "../selectmenus/activity";
import { sendVoiceLeaderboard } from "../utils/sendVoiceLeaderboard";

/**
 * @type {SlashCommand}
 */
export const ActivitySlash: SlashCommand = {
    config: new SlashCommandBuilder()
        .setName("activity")
        .setDescription("View server activity"),
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {KiwiClient} client
     */
    async execute(interaction: ChatInputCommandInteraction, client: KiwiClient): Promise<void> {

        var SelectMenu = ActivitySelectMenu.config as StringSelectMenuBuilder;
        SelectMenu.setCustomId(await client.createCustomId({
            customId: ActivitySelectMenu.customId,
            ownerId: interaction.user.id
        }));
        var row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(SelectMenu);

        sendVoiceLeaderboard(client, interaction.guildId, interaction.channelId, "daily");

        interaction.reply({ content: "Select the activity type", components: [row] });
    },
}