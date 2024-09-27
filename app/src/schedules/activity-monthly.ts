import { RecurrenceRule } from "node-schedule";
import { Schedule } from "../types/schedule";
import { KiwiClient } from "../client";

var timeRule = new RecurrenceRule();
timeRule.tz = 'CST';
timeRule.minute = 0;
timeRule.hour = 0;
timeRule.date = 1;

export const ActivityMonthlySchedule: Schedule = {
    rule: timeRule,
    execute: async (client: KiwiClient) => {
        console.log("Monthly Activity");
        for (var guild of await client.guilds.fetch()) {
            var voiceStates = await client.db.repos.activityVoicestates.findBy({ guildId: guild[0] });
            voiceStates.forEach(async (userVoiceState) => {
                client.db.repos.activityVoice.save({
                    guildId: guild[0],
                    userId: userVoiceState.userId,
                    monthlySeconds: 0
                })
            });
        }
    }
}
