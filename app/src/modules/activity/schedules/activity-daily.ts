import { RecurrenceRule } from "node-schedule";
import { TextChannel } from "discord.js";
import { Schedule } from "../../../types/schedule";
import { KiwiClient } from "../../../client";

import { getActivityConfig } from "../utils/getActivityConfig";
import { updateVoiceState } from "../utils/updateVoiceState";
import { saveVoice } from "../utils/saveVoice";
import { grantMostActiveRole } from "../utils/grantMostActiveRole";
import { sendVoiceLeaderboard } from "../utils/sendVoiceLeaderboard";

var timeRule = new RecurrenceRule();
timeRule.tz = 'UTC';
timeRule.hour = 0;
timeRule.minute = 0

export const ActivityDailySchedule: Schedule = {
    rule: timeRule,
    execute: async (client: KiwiClient, guildId: string) => {
        console.log("Daily Activity");
        var voiceStates = await client.db.repos.activityVoicestates.findBy({ guildId: guildId });
        for (var userVoiceState of voiceStates) {
            var secondsSinceLastUpdate = (new Date().getTime() - userVoiceState.joinedAt.getTime()) / 1000;
            updateVoiceState(client, guildId, userVoiceState.userId, userVoiceState.channelId);
            await saveVoice(client, guildId, userVoiceState.userId, secondsSinceLastUpdate);
        }

        await grantMostActiveRole(client, guildId, "daily");
        var actConf = await getActivityConfig(client, guildId);
        if (actConf?.logChannel) await sendVoiceLeaderboard(client, guildId, actConf.logChannel, "daily");

        client.db.repos.activityVoice.update({
            guildId: guildId
        }, {
            dailySeconds: 0
        });

    }
}