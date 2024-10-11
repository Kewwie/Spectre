import { ActionRowBuilder, BaseInteraction, ButtonBuilder, ChannelSelectMenuBuilder, EmbedBuilder, MessageComponentInteraction, RoleSelectMenuBuilder, StringSelectMenuBuilder, User } from "discord.js";
import { KiwiClient } from "./app/src/client";

import { ConfigSelectMenu } from "./app/src/modules/config/selectmenus/configType";
import { ConfigChannelSelectMenu } from "./app/src/modules/config/selectmenus/configChannel";
import { ConfigRoleSelectMenu } from "./app/src/modules/config/selectmenus/configRole";
import { ConfigCancel } from "./app/src/modules/config/buttons/configCancel";
import { ConfigToggle } from "./app/src/modules/config/buttons/configToggle";
import { ConfigCommands } from "./app/src/modules/config/buttons/moduleInfo";
import { Emojis } from "./app/src/emojis";

export class PageManager {
    private client: KiwiClient;

    constructor(client: KiwiClient) {
        this.client = client;
    }

    generateEmbeds(options: { title?: string, thumbnail?: string, description?: string, user?: User }) {
        var em = new EmbedBuilder()
            .setColor(this.client.Settings.color);

        if (options.title) em.setTitle(this.client.capitalize(options.title));
        if (options.thumbnail) em.setThumbnail(options.thumbnail);
        if (options.description) em.setDescription(options.description);
        if (options.user) em.setFooter({ text: `${this.client.capitalize(options.user.displayName)} (${options.user.username})`, iconURL: options.user.avatarURL() });

        return [em];
    }

    generateModuleButtons(moduleId: string, interaction: BaseInteraction) {
        var configToggleButton = ConfigToggle.config;
        configToggleButton.setCustomId(this.client.createCustomId({customId: ConfigToggle.customId , optionOne: moduleId, ownerId: interaction.user.id}));
        var commandsButton = ConfigCommands.config;
        commandsButton.setCustomId(this.client.createCustomId({customId: ConfigCommands.customId , optionOne: moduleId, ownerId: interaction.user.id}));
        var cancelButton = ConfigCancel.config;
        cancelButton.setCustomId(this.client.createCustomId({customId: ConfigCancel.customId , ownerId: interaction.user.id}));

        return [ configToggleButton, commandsButton, cancelButton ];
    }

    generateChannelsSelectMenu(options: {moduleId: string, option: string ,userId: string, currentChannels?: string, }) {
        var SelectMenu = ConfigChannelSelectMenu.config as ChannelSelectMenuBuilder;
        SelectMenu.setCustomId(this.client.createCustomId({customId: ConfigChannelSelectMenu.customId , optionOne: options.moduleId, optionTwo: options.option, ownerId: options.userId}));
        if (options.currentChannels) {
            SelectMenu.setDefaultChannels(options.currentChannels);
        } else {
            SelectMenu.setDefaultChannels();
        }
        return SelectMenu;
    }

    generateRolesSelectMenu(options: {moduleId: string, option: string ,userId: string, currentRoles?: string, }) {
        var SelectMenu = ConfigRoleSelectMenu.config as RoleSelectMenuBuilder;
        SelectMenu.setCustomId(this.client.createCustomId({customId: ConfigRoleSelectMenu.customId , optionOne: options.moduleId, optionTwo: options.option, ownerId: options.userId}));
        if (options.currentRoles) {
            SelectMenu.setDefaultRoles(options.currentRoles);
        } else {
            SelectMenu.setDefaultRoles();
        }
        return SelectMenu;
    }

    generateStringSelectMenu(config: 
        {
            customId: string,
            placeholder: string,
            options: Array<{ label: string, value: string, description?: string, default?: boolean }>
        }
    ) {
        var SelectMenu = new StringSelectMenuBuilder()
            .setPlaceholder(config.placeholder);
        
        config.options.forEach((option) => {
            SelectMenu.addOptions({
                label: option.label,
                value: option.value,
                description: option.description,
                default: option.default
            });
        });
        
        return SelectMenu;
    }

    async generateConfigPage(pageId: string, interaction: BaseInteraction) {
        var isEnabled = await this.client.db.repos.guildModules
            .findOneBy({ guildId: interaction.guildId, moduleId: pageId });
        var rows = [];

        switch (pageId) {
            case "overview": {
                var owner = await this.client.users.fetch(interaction.guild.ownerId);
                var embedDescription = [
                    `### Guild Overview`,
                    `${Emojis.ReplyTop} **Owner:** ${owner.displayName} (${owner.username})`,
                    `${Emojis.ReplyMiddle} **Members:** ${interaction.guild.memberCount}`,
                    `${Emojis.ReplyBottom} **Ping:** ${Math.round(this.client.ws.ping)}ms`,
                ];
                break;
            }
            case "permissions": {
                var embedDescription = [
                    `### Permissions Module`,
                    `${Emojis.ReplyTop} **Enabled:** ${isEnabled ? 'True' : 'False'}`,
                    `${Emojis.ReplyBottom} **Status:** Not Released`,
                ];
                rows.push(
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(this.generateModuleButtons(pageId, interaction)),
                );
                break;
            }

            case "activity": {
                var actConf = await this.client.db.repos.activityConfig
                    .findOneBy({ guildId: interaction.guildId });
                var embedDescription = [
                    `### Activity Module`,
                    `${Emojis.ReplyTop} **Enabled:** ${isEnabled ? 'True' : 'False'}`,
                    `${Emojis.ReplyMiddle} **Log Channel:** ${actConf?.logChannel ? `<#${actConf.logChannel}>` : 'None'}`,
                    `${Emojis.ReplyBottom} **Most Active Role:** ${actConf?.mostActiveRole ? `<@&${actConf.mostActiveRole}>` : 'None'}`,
                ];
                rows.push(
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(this.generateModuleButtons(pageId, interaction)),
                    new ActionRowBuilder<ChannelSelectMenuBuilder>()
                        .addComponents(this.generateChannelsSelectMenu({ moduleId: pageId, option: "logChannel", userId: interaction.user.id, currentChannels: actConf?.logChannel })
                                .setPlaceholder('Log Channel')),
                    new ActionRowBuilder<RoleSelectMenuBuilder>()
                        .addComponents(this.generateRolesSelectMenu({ moduleId: pageId, option: "mostActiveRole", userId: interaction.user.id, currentRoles: actConf?.mostActiveRole })
                                .setPlaceholder('Most Active Role')),
                );
                break;
            }

            case "verification": {
                var embedDescription = [
                    `### Verification Module`,
                    `${Emojis.ReplyTop} **Enabled:** ${isEnabled ? 'True' : 'False'}`,
                    `${Emojis.ReplyBottom} **Status:** Not Released`,
                ];
                rows.push(
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(this.generateModuleButtons(pageId, interaction)),
                );
                break;
            }

            case "list": {
                var listConf = await this.client.db.repos.listConfig
                    .findOneBy({ guildId: interaction.guildId });
                var embedDescription = [
                    `### List Module`,
                    `${Emojis.ReplyTop} **Enabled:** ${isEnabled ? 'True' : 'False'}`,
                    `${Emojis.ReplyBottom} **Log Channel:** ${listConf?.logChannel ? `<#${listConf.logChannel}>` : 'None'}`,
                ];
                rows.push(
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(this.generateModuleButtons(pageId, interaction)),
                    new ActionRowBuilder<ChannelSelectMenuBuilder>()
                    .addComponents(this.generateChannelsSelectMenu({ moduleId: pageId, option: "logChannel", userId: interaction.user.id, currentChannels: listConf?.logChannel })
                            .setPlaceholder('Log Channel')),
                );
                break;
            }
        }

        /*rows.push(
            new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(this.generateModulesSelectMenu(pageId, interaction))
        );*/

        return {
            embeds: [
                ...this.generateEmbeds({
                    title: `Server Configuration`,
                    thumbnail: interaction.guild.iconURL(),
                    description: embedDescription.join("\n"),
                    user: interaction.user
                })
            ],
            rows: [...rows]
        }
    }
};