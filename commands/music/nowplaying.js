const { MessageEmbed } = require('discord.js');
require("dotenv").config();

const Format = Intl.NumberFormat();
const status = queue => `Volume: \`${queue.volume}%\` 
| Filters: \`${queue.filters.join(', ') || 'Off'}\` 
| Repeat: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlist' : 'Song') : 'Off'}\` 
| Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    category: "Music",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, message, args) => {
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
        
        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor(`${process.env.EMBED_COLOR}`)
        .setAuthor({name: 'Currently Playing...'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addFields({name: "Status | ",value: `┕${status(queue).toString()}`, inline: false},
        { name: 'Views/Listeners | ', value: `┕${Format.format(song.views)}`, inline: true},
        { name: 'Likes | ', value: `┕${Format.format(song.likes)}`, inline: true},
        { name: 'Duration | ', value: `┕${queue.formattedCurrentTime} / ${song.formattedDuration}`, inline: true},
        { name: 'Download | ', value: `┕[Click Here](${song.streamURL})`, inline: true},
        { name: "Added by | ", value: ` ┕${song.user}`, inline: true})

        message.reply({embeds: [embed]});
    }
}
