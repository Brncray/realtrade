import { CronJob } from "cron";
import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "discord-voip";
import { EmbedBuilder } from "discord.js";
import { schedule } from "node-cron";

export const data = {
    name: "scare",
    description: "scare people",
    options: [{
        name: "user",
        description: "The user to scare",
        type: 6,
        required: false
    }],
    dm_permission: false,
};
/**
 * This function is executed when user submits command
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const target = interaction.options.getUser("user") || interaction.user;
    const guild = interaction.guild;

    const member = guild.members.cache.get(target.id) || await guild.members.fetch(target.id);



    if (!member.voice.channelId) return interaction.reply("You must be in a voice channel to use this command");

    const connection = joinVoiceChannel({
        channelId: member.voice.channelId,
        guildId: interaction.guildId,   
        adapterCreator: interaction.guild.voiceAdapterCreator,
    })

    const player = createAudioPlayer();


    // get the audio files in audios and pick a random one
    const audio_files = ["scare1.mp3", "scare2.mp3"];

    const audio_file = audio_files[Math.floor(Math.random() * audio_files.length)];

    const resource = await createAudioResource("https://cdn.discordapp.com/attachments/1301248809254391852/1311073649792516096/Naktigonis_-_To_Sleep_Dreaming_Contour_1_Deepwoken_OST-AudioTrimmer.com.mp3?ex=674787fc&is=6746367c&hm=4f62f5d8ff2787c28812b87cd3fb39a2c1054a57501ab741abd4cac9f059ad39&");

    player.play(resource);
    connection.subscribe(player);

    player.on("stateChange", (oldState, newState) => {
        if (newState.status === "idle") {
            connection.destroy();
        }
    })

    // cron job that will destroy the connection after 5 seconds
    const job = new CronJob("*/5 * * * * *", () => {
        connection.destroy();
    })

}
