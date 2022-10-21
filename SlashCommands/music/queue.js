const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'queue',
    description: 'View the list of songs queued.',
    usage: 'queue',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('No songs currently playing.')
            ]})
        }

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing | ' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration} Requested by | ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `And **${songs - 10}** more songs...` : `In playlist **${songs}** songs...`;

        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Queue'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addFields({ name: `Current Song | `, value: `┕[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Requested by: ${queue.songs[0].user}`, inline: false},
            { name: `Total Duration | `, value: `┕${queue.formattedDuration}`, inline: true},
            { name: `Total songs | `, value: `┕${songs}`, inline: true})
        ]})
    }
}