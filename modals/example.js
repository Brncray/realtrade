import { TextInputStyle, ComponentType } from "discord.js";

export const data = {
    name: "example_file",
};
/**
 * @param {import("discord.js").ModalSubmitInteraction<"cached">} int
 * @param {import("../bot").Bot} client
 */
export async function execute(int, client) {
    await int.reply({ content: "received", ephemeral: true });

    /** @type {import("discord.js").APIModalComponent} */
    const modal = {
        type: 1,
        components: [
            {
                custom_id: "one",
                label: "smth",
                style: TextInputStyle.Short,
                type: ComponentType.TextInput,
                min_length: 5,
                value: "value",
            },
            {
                custom_id: "two",
                label: "more",
                style: TextInputStyle.Paragraph,
                placeholder: "placeholder",
                required: true,
                max_length: 1024,
                type: ComponentType.TextInput,
            },
        ],
    };
    // int.showModal(modal)
}