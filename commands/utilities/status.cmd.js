import { EmbedBuilder } from "discord.js";

export const data = {
    name: "status",
    description: "change bot status",
    options: [{
        name: "status",
        description: "The status you want to set",
        type: 3,
        required: true,
    },
    {
        name: "type",
        description: "The type of status you want to set",
        type: 4,
        required: true,
        choices: [
            {
                name: "PLAYING",
                value: '0',
            },
            {
                name: "STREAMING",
                value: '1',
            },
            {
                name: "LISTENING",
                value: '2',
            },
            {
                name: "WATCHING",
                value: '3',
            },
            {
                name: "COMPETING",
                value: '5',
            },
        ],
    }
],
    dm_permission: false,
};
/**
 * This function is executed when user submits command
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function execute(interaction, client) {

    if (interaction.user.id !== '539213950688952320') return interaction.reply("You are not allowed to use this command");

    await interaction.deferReply({ ephemeral: true });

    const status = interaction.options.getString("status");

    const type = interaction.options.getInteger("type");

    client.user.setActivity(status, { type: type });

    const embed = new EmbedBuilder()
        .setTitle("Status changed")
        .setDescription(`Status changed to ${status}`)
        .setColor("Green")
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL()
        })

    await interaction.editReply({ embeds: [embed] });


}
