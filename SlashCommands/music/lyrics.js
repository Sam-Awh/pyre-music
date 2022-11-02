const { MessageEmbed } = require("discord.js");
const solenolyrics = require("solenolyrics");
require("dotenv").config();

module.exports = {
    name: "lyrics",
    description: "Get lyrics for the currently playing song",
    usage: "lyrics",
    run: async (client, interaction, message, args) => {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('The song is not playing/present in the queue!')
        ]});

        let lyrics = null;

        try {
            lyrics = await solenolyrics.requestLyricsFor(queue.songs[0].name, "");
            if (!lyrics) lyrics = `Lyrics not found for ${queue.songs[0].name}.`;
        } catch (error) {
            lyrics = `Lyrics not found for ${queue.songs[0].name}.`;
        }

        let lyricsEmbed = new MessageEmbed()
            .setAuthor({name: `${queue.songs[0].name} - Lyrics`})
            .setDescription(`${lyrics}`)
            .setFooter({text: `Google the lyrics if you want the entire thing smh.`})
            .setColor(`${process.env.EMBED_COLOR}`);
            if (lyricsEmbed.description.length >= 2048) {
                lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return interaction.followUp({embeds: [lyricsEmbed]});
            } 
            else {
                return interaction.followUp({embeds: [lyricsEmbed]});
            }
    }
};