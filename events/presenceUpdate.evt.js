import { CronJob } from "cron";

export const data = {
    name: "presenceUpdate"
};
/**
 * 
 * @param {import("discord.js").Message} message
 * @param {import("../bot.js").Bot} client
 */
export async function execute(oldState, newState, client) {

    if (newState.guild.id !== '1198783990354694235') return

    const userId = newState.userId;

    if (newState.activities.length > 0) {

        // Send a DM to the user (example)
        if (newState.activities[0].name === 'Roblox') {
            const channel = client.channels.cache.get('1198783991059333182')



            if (channel) {
                await channel.send(`<@${userId}>, it looks like you're on Roblox... Remember the Deep is calling. `);
                console.log(`Sent a message to ${userId}`);
            }
        }
    }
}