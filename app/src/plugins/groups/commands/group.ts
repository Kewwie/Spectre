import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    resolveColor,
    ColorResolvable
} from "discord.js";

import { 
    CommandTypes,
    SlashCommandContexts,
    IntegrationTypes,
    OptionTypes,
    Permissions,
    Command
} from "../../../types/command";
import { KiwiClient } from "../../../client";

import { dataSource } from "../../../data/datasource";
import { Group } from "../../../data/entities/Group";
import { GroupMember } from "../../../data/entities/GroupMember";
import { GroupAdmin } from "../../../data/entities/GroupAdmin";

export const GroupCommand: Command =  {
	config: {
        name: "group",
        description: "Group Commands",
        type: CommandTypes.CHAT_INPUT,
        default_member_permissions: null,
        contexts: [SlashCommandContexts.GUILD],
        integration_types: [IntegrationTypes.GUILD],
        options: [
            {
                type: OptionTypes.SUB_COMMAND,
                name: "create",
                description: "Create a group",
                options: [
                    {
                        type: OptionTypes.STRING,
                        name: "name",
                        description: "Name of the group",
                        required: true
                    }
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "sync",
                description: "Sync all group roles with the database",
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "join",
                description: "Join a group",
                options: [
                    {
                        type: OptionTypes.STRING,
                        name: "name",
                        description: "Name of the group",
                        required: true
                    }
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "leave",
                description: "Leave a group",
                options: [
                    {
                        type: OptionTypes.STRING,
                        name: "name",
                        description: "Name of the group",
                        required: true
                    }
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND_GROUP,
                name: "member",
                description: "Manage members of a group",
                options: [
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "add",
                        description: "Add a user to a group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.USER,
                                name: "user",
                                description: "The user to add to the group",
                                required: true
                            }
                        ]
                    },
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "remove",
                        description: "Remove a user from a group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.USER,
                                name: "user",
                                description: "The user to remove from the group",
                                required: true
                            }
                        ]
                    },
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND_GROUP,
                name: "admin",
                description: "Manage members of a group",
                options: [
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "add",
                        description: "Add a user to a group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.USER,
                                name: "user",
                                description: "The user to add to the group",
                                required: true
                            }
                        ]
                    },
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "remove",
                        description: "Remove a user from a group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.USER,
                                name: "user",
                                description: "The user to remove from the group",
                                required: true
                            }
                        ]
                    },
                ]
            },          
            {
                type: OptionTypes.SUB_COMMAND_GROUP,
                name: "modify",
                description: "Modify a group",
                options: [
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "color",
                        description: "Change the color of the group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.STRING,
                                name: "color",
                                description: "Color of the group",
                                required: true
                            }
                        ]
                    },
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "name",
                        description: "Change the name of the group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.STRING,
                                name: "newname",
                                description: "New name of the group",
                                required: true
                            }
                        ]
                    },
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "private",
                        description: "Change the privacy of the group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.STRING,
                                name: "private",
                                description: "true or false",
                                choices: [
                                    { name: "True", value: "true" },
                                    { name: "False", value: "false" }
                                ],
                                required: true
                            }
                        ]
                    },
                    {
                        type: OptionTypes.SUB_COMMAND,
                        name: "owner",
                        description: "Transfer ownership of the group",
                        options: [
                            {
                                type: OptionTypes.STRING,
                                name: "name",
                                description: "Name of the group",
                                required: true
                            },
                            {
                                type: OptionTypes.USER,
                                name: "user",
                                description: "A user to transfer ownership to",
                                required: true
                            }
                        ]
                    },
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "list",
                description: "Lists all groups"
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "info",
                description: "Info about a group",
                options: [
                    {
                        type: OptionTypes.STRING,
                        name: "name",
                        description: "Name of the group",
                        required: true
                    }
                ]
            },
            {
                type: OptionTypes.SUB_COMMAND,
                name: "delete",
                description: "Delete a group",
                options: [
                    {
                        type: OptionTypes.STRING,
                        name: "name",
                        description: "Name of the group",
                        required: true
                    }
                ]
            }
        ]
    },

	/**
    * @param {ChatInputCommandInteraction} interaction
    * @param {KiwiClient} client
    */
	async execute(interaction: ChatInputCommandInteraction, client: KiwiClient) {
        const GroupRepository = await dataSource.getRepository(Group);
        const GroupAdminsRepository = await dataSource.getRepository(GroupAdmin);
        const GroupMembersRepository = await dataSource.getRepository(GroupMember);
        
        switch (interaction.options.getSubcommand()) {
            case "create": {
                var name = interaction.options.getString('name');

                const existingGroup = await GroupRepository.findOne(
                    {
                        where: {
                            guildId: interaction.guild.id,
                            name: name
                        }
                    }
                )

                if (existingGroup) {
                    await interaction.reply("Group already exists.");
                    return;
                }
                const role = await interaction.guild.roles.create({
                    name: `Group ${name}`,
                    color: "Random",
                    mentionable: true
                });

                await interaction.guild.members.cache.get(interaction.member.user.id).roles.add(role);

                var ResGroup = await GroupRepository.insert({
                    groupId: String(Date.now() - 1000),
                    name: name,
                    guildId: interaction.guild.id,
                    roleId: role.id,
                    ownerId: interaction.user.id,
                    private: false
                });

                await GroupAdminsRepository.insert({
                    groupId: ResGroup.identifiers[0].groupId,
                    userId: interaction.user.id,
                    username: interaction.user.username
                });

                await GroupMembersRepository.insert({
                    groupId: ResGroup.identifiers[0].groupId,
                    userId: interaction.user.id,
                    username: interaction.user.username
                });

                await interaction.reply(`Group ${name} has been created.`);
                break;
            }
            case "sync": {
                await interaction.reply("Groups have been synced.");
                break;
            }
            case "join": {
                var name = interaction.options.getString('name');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    if (existingGroup.private) {
                        await interaction.reply("This group is private.");
                        return;
                    }

                    const groupMember = await GroupMembersRepository.findOne({
                        where: { groupId: existingGroup.groupId, userId: interaction.user.id }
                    });

                    if (groupMember) {
                        await interaction.reply("You are already a member of this group.");
                        return;
                    }
                    await interaction.guild.members.cache.get(interaction.user.id).roles.add(existingGroup.roleId);

                    await GroupMembersRepository.insert({
                        groupId: existingGroup.groupId,
                        userId: interaction.user.id,
                        username: interaction.user.username
                    });
                    await interaction.reply(`You have joined the group **${name}**.`);
                } else {
                    await interaction.reply("Group does not exist.");
                }
                break;
            }
            case "leave": {
                var name = interaction.options.getString('name');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    if (existingGroup.ownerId === interaction.user.id) {
                        await interaction.reply("You cannot leave a group you own.");
                        return;
                    }

                    const groupMember = await GroupMembersRepository.findOne({ 
                        where: { groupId: existingGroup.groupId, userId: interaction.user.id }
                    });

                    if (groupMember) {
                        await interaction.guild.members.cache.get(interaction.user.id).roles.remove(existingGroup.roleId);
                        
                        await GroupMembersRepository.delete({ groupId: existingGroup.groupId, userId: interaction.user.id })
                        await interaction.reply(`You have left the group **${name}**`);
                    } else {
                        await interaction.reply(`You are not a member of the group **${name}**`);
                    }
                } else {
                    await interaction.reply(`The group **${name}** does not exist`);
                }
                break;
            }
            case "add": {
                var name = interaction.options.getString('name');
                var user = interaction.options.getUser('user');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    switch (interaction.options.getSubcommandGroup()) {
                        case "member": {
                            const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: interaction.user.id }});
                            if (groupAdmin) {
                                await interaction.reply(`You do not have permission to add members to group **${name}**`);
                                return;
                            }
                            const groupMember = await GroupMembersRepository.findOne({ where: { groupId: existingGroup.groupId, userId: user.id }});
                            if (groupMember) {
                                let userTag = await client.getTag({name: user.username, discriminator: user.discriminator});
                                await interaction.reply(`**${userTag}** is already a member of group **${name}**`);
                                return;
                            }

                            await GroupMembersRepository.insert({
                                groupId: existingGroup.groupId,
                                userId: user.id,
                                username: user.username
                            });
                            await interaction.guild.members.cache.get(user.id).roles.add(existingGroup.roleId);
                            let userTag = await client.getTag({name: user.username, discriminator: user.discriminator});
                            await interaction.reply(`**${userTag}** has been added to group **${name}**`);
                            break;
                        }
                        case "admin": {
                            if (existingGroup.ownerId !== interaction.user.id) {
                                await interaction.reply("You are not the owner of this group");
                                return;
                            }

                            var userTag = await client.getTag({name: user.username, discriminator: user.discriminator});
                            const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: user.id }});
                            if (groupAdmin) {
                                await GroupAdminsRepository.upsert(
                                    { groupId: existingGroup.groupId, userId: user.id, username: userTag },
                                    ["groupId", "userId"]
                                );
                                await GroupMembersRepository.upsert(
                                    { groupId: existingGroup.groupId, userId: user.id, username: userTag },
                                    ["groupId", "userId"]
                                );
                                await interaction.reply(`**${userTag}** is now an admin of group **${name}**`);
                            } else {
                                await interaction.reply(`**${userTag}** is already an admin of group **${name}**`);
                            }
                        }
                    }
                } else {
                    await interaction.reply(`Group **${name}** does not exist`);
                }
                break;
            }
            case "remove": {
                var name = interaction.options.getString('name');
                var user = interaction.options.getUser('user');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    switch (interaction.options.getSubcommandGroup()) {
                        case "member": {
                            if (existingGroup.ownerId === user.id) {
                                await interaction.reply("You cannot remove the owner of the group");
                                return;
                            }

                            const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: interaction.user.id }});
                            if (!groupAdmin) {
                                await interaction.reply(`You do not have permission to add members to group **${name}**`);
                                return;
                            }

                            const userGroupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: user.id }});
                            if (userGroupAdmin && existingGroup.ownerId !== interaction.user.id) {
                                await interaction.reply(`You cannot remove another group admin`);
                                return;
                            }

                            var userTag = await client.getTag({name: user.username, discriminator: user.discriminator});
                            const groupMember = await GroupMembersRepository.findOne({ where: { groupId: existingGroup.groupId, userId: user.id }});
                            if (groupMember) {
                                await interaction.guild.members.cache.get(user.id).roles.remove(existingGroup.roleId);
                                await GroupMembersRepository.delete({ groupId: existingGroup.groupId, userId: user.id })
                                await GroupAdminsRepository.delete({ groupId: existingGroup.groupId, userId: user.id })
                                await interaction.reply(`**${userTag}** has been removed from group **${name}**`);
                            } else {
                                await interaction.reply(`**${userTag}** is not a member of group **${name}**`);
                            }
                        }
                        case "admin": {
                            if (existingGroup.ownerId === user.id) {
                                await interaction.reply("You cannot remove the owner of the group");
                                return;
                            }

                            if (existingGroup.ownerId !== interaction.user.id) {
                                await interaction.reply("You are not the owner of this group");
                                return;
                            }

                            var userTag = await client.getTag({name: user.username, discriminator: user.discriminator});
                            const groupMember = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: user.id }});
                            if (groupMember) {
                                await GroupAdminsRepository.delete({ groupId: existingGroup.groupId, userId: user.id })
                                await interaction.reply(`**${userTag}** is no longer admin of group **${name}**`);
                            } else {
                                await interaction.reply(`**${userTag}** is not an admin of group **${name}**`);
                            }
                        }
                    }
                } else {
                    await interaction.reply(`Group **${name}** does not exist`);
                }
                break;
            }
            case "color": {
                var name = interaction.options.getString('name');
                var color = interaction.options.getString('color');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: interaction.user.id }});
                    if (!groupAdmin) {
                        await interaction.reply(`You do not have permission to change the color of the group **${name}**`);
                        return;
                    }
                    const role = interaction.guild.roles.cache.get(existingGroup.roleId);
                    if (role) {
                        console.log(resolveColor(color as ColorResolvable), 1011)
                        await role.setColor(resolveColor(color as ColorResolvable));
                        await interaction.reply(`Color of group **${name}** has been changed to **${color}**`);
                    } else {
                        await interaction.reply("Group role not found");
                    }
                } else {
                    await interaction.reply("You are not the owner of this group");
                }
                break;
            }
            case "name": {
                var name = interaction.options.getString('name');
                var newName = interaction.options.getString('newname');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: interaction.user.id }});
                    if (!groupAdmin) {
                        await interaction.reply(`You do not have permission to change the name of the group **${name}**`);
                        return;
                    }
                    const role = interaction.guild.roles.cache.get(existingGroup.roleId);
                    if (role) {
                        await role.edit({ name: `Group ${newName}` });
                    } else {
                        await interaction.reply("Group role not found");
                        return;
                    }

                    await GroupRepository.update(
                        { groupId: existingGroup.groupId },
                        { name: newName }
                    );

                    await interaction.reply(`Group **${name}** has been renamed to **${newName}**`);
                } else {
                    await interaction.reply("This group doesnt exist");
                }
                break;
            }
            case "private": {
                var name = interaction.options.getString('name');
                var isPrivate = interaction.options.getString('private');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    const groupAdmin = await GroupAdminsRepository.findOne({ where: { groupId: existingGroup.groupId, userId: interaction.user.id }});
                    if (!groupAdmin) {
                        await interaction.reply(`You do not have permission to change the privacy of the group **${name}**`);
                        return;
                    }

                    await GroupRepository.update({ groupId: existingGroup.groupId }, { private: (isPrivate === "true") });
                    await interaction.reply(`Group **${name}** privacy has been updated`);
                } else {
                    await interaction.reply("This group doesnt exist");
                }
                break;
            }
            case "owner": {
                var user = interaction.options.getUser('user');
                var name = interaction.options.getString('name');

                if (user.bot) {
                    await interaction.reply("Bots cannot have ownership of a group");
                    return;
                }

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    if (existingGroup.ownerId !== interaction.user.id) {
                        await interaction.reply("You are not the owner of this group");
                        return;
                    }
                    
                    await GroupRepository.update({ groupId: existingGroup.groupId }, { ownerId: user.id });
                    await GroupAdminsRepository.upsert(
                        { groupId: existingGroup.groupId, userId: user.id, username: user.username },
                        ["groupId", "userId"]
                    )
                    await GroupMembersRepository.upsert(
                        { groupId: existingGroup.groupId, userId: user.id, username: user.username },
                        ["groupId", "userId"]
                    );

                    await interaction.reply(`Ownership of group **${name}** has been transferred to **${user.username}**`);
                } else {
                    await interaction.reply("This group doesnt exist");
                }
                break;
            }
            case "list": {
                const groups = await GroupRepository.find({ where: { guildId: interaction.guild.id } });
                console.log(groups);
                if (groups.length > 0) {
                    const groupNames = groups.map(group => group.name).join(", ");
                    await interaction.reply(`Groups in this guild: **${groupNames}**`);
                } else {
                    await interaction.reply("There are no groups in this guild");
                }
                break;
            }
            case "info": {
                var name = interaction.options.getString('name');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    const groupAdmins = await GroupAdminsRepository.find({ where: { groupId: existingGroup.groupId } });
                    const groupMembers = await GroupMembersRepository.find({ where: { groupId: existingGroup.groupId } });

                    var em = new EmbedBuilder()
                        .setTitle("Group " + existingGroup.name)
                        .addFields(
                            { name: "Owner", value: `<@${existingGroup.ownerId}>` },
                            { name: "Admins", value: groupAdmins.map(admin => `${admin.username}`).join(", ") },
                            { name: "Members", value: groupMembers.map(member => `${member.username}`).join(", ") },
                            { name: "Private", value: existingGroup.private ? "Yes" : "No" }
                        )
                        .setColor(client.embed.color)
                        .setTimestamp();

                    await interaction.reply({ embeds: [em] });
                } else {
                    await interaction.reply("Group does not exist");
                }
                break;
            }
            case "delete": {
                var name = interaction.options.getString('name');

                const existingGroup = await GroupRepository.findOne({
                    where: {
                        guildId: interaction.guild.id,
                        name: name
                    }
                });

                if (existingGroup) {
                    if (existingGroup.ownerId !== interaction.user.id) {
                        await interaction.reply("You are not the owner of this group");
                        return;
                    }

                    const role = interaction.guild.roles.cache.get(existingGroup.roleId);
                    if (role) {
                        await role.delete();
                    }

                    await GroupRepository.delete({ guildId: interaction.guild.id, groupId: existingGroup.groupId });

                    await interaction.reply(`Group **${name}** has been deleted`);
                } else {
                    await interaction.reply("This group doesnt exist");
                }
                break;
            }
        }
	},
}