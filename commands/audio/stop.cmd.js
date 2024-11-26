import { getVoiceConnection } from "discord-voip";

export const data = {
    name: "stop",
    description: "stops the current audio",
    options: [],
    dm_permission: false,
};
/**
 * This function is executed when user submits command
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function execute(interaction, client) {

    await interaction.deferReply({ ephemeral: true });

    const connection = getVoiceConnection(interaction.guildId);

    if (!connection) return interaction.editReply("I am not in a voice channel");

    connection.destroy();

    await interaction.editReply("Audio stopped");
}

