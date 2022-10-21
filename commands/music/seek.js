const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: "seek",
    aliases: ["seek"],
    category: "Music",
    description: "Seek to a specific time in the current song.",
    usage: "<time>",
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
        
        if(!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('You must choose a timeline to rewind!')
        ]})

        const time = Number(args.join(' '));
        console.log(time)
        console.log(queue.songs[0].formattedDuration)
        console.log(queue.songs[0].duration)
        if(time > queue.songs[0].formattedDuration) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('The seek time cannot be greater than the song duration!')
        ]})

        queue.seek(time);
        message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Seek'})
            .setDescription(`Fast forward to **${time}ms / ${queue.songs[0].duration}ms**`)
        ]})
    }
}