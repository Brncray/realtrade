import { Collection, GatewayIntentBits} from "discord.js";
import { Bot } from "./bot.js";
import { config } from "dotenv";
config();
process.on("uncaughtException", (e) => console.log("[ UNCAUGHT EXCEPTION ] →", e));
process.on("unhandledRejection", (e) => console.log("[ UNHANDLED REJECTION ] →", e));
(async () => {
    const client = new Bot({
        intents: [
            GatewayIntentBits.Guilds, 
        ],
    });
    client.settings = {
        ...client.settings,
        color: 0x2a2c31,
        channel: '1130294677237678120',
        tickers: (await import("./data/tickers.json", { assert: {type: "json"}})).default
    };
    await client.init();
})();
