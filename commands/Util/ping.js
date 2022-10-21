const { MessageEmbed, Client, version } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "ping",
    aliases: [' '],
    category: 'Util',
    usage: 'ping',
    description: 'Ping the bot and get dev info.',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const statsembed = new MessageEmbed()
      .addFields(
        {
          name: "Client",
          value: `┕Online! <t:${parseInt(client.readyTimestamp /1000)}:R>`,
          inline: true,
        },
        {
          name: "Ping",
          value: `┕${Math.round(message.client.ws.ping)}ms`,
          inline: true,
        },
        {
          name: "Memory",
          value: `┕${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`,
          inline: true,
        },
        {
          name: "Version",
          value: `┕v${require("../../package.json").version}`,
          inline: true,
        },
        {
          name: "Discord.js",
          value: `┕v${version}`,
          inline: true,
        },
        {
          name: "Node",
          value: `┕${process.version}`,
          inline: true,
        },
        )
        .setColor(`${process.env.EMBED_COLOR}`)
        message.reply({ embeds: [statsembed]});
      },
};
