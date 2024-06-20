import { EmbedBuilder } from "discord.js";
import quote from 'stock-quote';
const getQuote = quote.getQuote;

export const data = {
    name: "stock",
    description: "Check a company's stock price",
    options: [
        {
            name: "symbol",
            description: "The stock symbol of the company",
            type: 3,
            required: true,
            autocomplete: true,
        },
    ],
    dm_permission: true,
};
/**
 * This function is executed when user submits command
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function execute(interaction, client) {
    const symbol = interaction.options.getString("symbol");

    let data = client.settings.tickers.find((t) => t.symbol === symbol);


    const quote = await getQuote(symbol); 

    if(!quote) return await interaction.reply({ content: "No data found for this symbol", ephemeral: true });



    const embed = new EmbedBuilder()
        .setTitle(symbol)
        .setDescription(`**Symbol**: ${symbol}\n**Country**: ${data.country ? data.country : "unknown"}\n**Industry**: ${data.industry}\n**Sector**: ${data.sector}`)
        .setFields([
            { name : "Symbol", value: symbol, inline: true },
            { name : "Country", value: data.country ? data.country : "unknown", inline: true },
            { name : "Industry", value: data.industry ? data.industry: "unknown", inline: true },
            { name : "Sector", value: data.sector ? data.industry : "unknown", inline: true },
            quote.map((q) => ({ name: q.name, value: q.value, inline: true }))




        ])
        .setColor("Random")
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });

}





import fuzzysort from "fuzzysort";

/**
 * This function is executed when autocomplete interaction is being triggered
 * @param {import("discord.js").AutocompleteInteraction<'cached'>} interaction
 * @param {import("../bot").Bot} client
 */
export async function autocomplete(interaction, client) {
    let data = []
    const focused = interaction.options.getFocused(true)
    switch (focused.name) {
        case "symbol":
            data = client.settings.tickers
            break;
    }

    const result = fuzzysort
    .go(focused.value, data, {
      limit: 25,
      keys: ["symbol"],
      all: true
    }).map(({obj}) => ({
      name: obj.symbol,
      value: obj.symbol
    }));
  await interaction.respond(result);

}
