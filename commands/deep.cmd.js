import { EmbedBuilder } from "discord.js";

export const data = {
    name: "deep",
    description: "the deep is calling",
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
    const embed = new EmbedBuilder()
        .setTitle("The deep is calling...")
        .setDescription("The deep is calling...")
        .setColor("Red")
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL()
            
        })
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed], content: "@here", allowedMentions: { parse: ['everyone', 'roles', 'users'] } });
}
