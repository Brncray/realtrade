export const data = {
    name: "name",
    description: "description",
    options: [],
    dm_permission: false,
    default_member_permissions: "permission required",
};
/**
 * This function is executed when user submits command
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function execute(interaction, client) {
    //do the command stuff here
}

import fuzzysort from "fuzzysort";

/**
 * This function is executed when autocomplete interaction is being triggered
 * @param {import("discord.js").AutocompleteInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function autocomplete(interaction, client) {
    const data = [];
    fuzzysort.go(interaction.options.getFocused(), data, {
        limit: 25,
        keys: ["name"],
        all: true,
    });
    //do the autocomplete stuff here
}
