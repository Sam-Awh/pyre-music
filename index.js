const { Client, Collection } = require("discord.js");
require("dotenv").config();

const { readdirSync } = require('fs');
const client = new Client({
    intents: 32767,
     ws: { properties: { $browser: "Discord iOS" } }
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

// Initializing the project
require("./handler")(client);
require("./client/player");

//anticrash
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})

client.login(process.env.TOKEN);
