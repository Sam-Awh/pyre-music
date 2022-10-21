const { MessageEmbed, MessageButton } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'queue',
    description: 'Show playlist',
    category: 'Music',
    aliases: ['q'],
    usage: 'queue',
    cooldown: 5,
    run: async (client, message, args, _fromButton = false) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription(`You need to join a voice channel to use this feature.`)
        ]});
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('No songs are playing!')
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setAuthor({name: 'Something went wrong...'})
                    .setDescription(`You need to be on the same voice channel as the bot!`)
                ]});
            }
        }

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Added by : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `And **${songs - 10}** more songs...` : `In playlist **${songs}** songs...`;

        message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Queue'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addFields({ name: `Now playing:`, values: `┕[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Requested by: ${queue.songs[0].user}`,inline: false},
            { name: `Total duration:`, values: `┕${queue.formattedDuration}`,inline: false},
            { name: `Total number of songs:`, values: `┕${songs}`,inline: false},)
        ]})
    }
}
