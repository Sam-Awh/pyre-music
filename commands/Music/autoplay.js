const {MessageEmbed} = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'autoplay',   
    description: 'Automatically play the track.',
    aliases: ['autoplay'],
    category: 'Music',
    usage: '',
    cooldown: 0,
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
        
        const autoplay = queue.toggleAutoplay()
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'AutoPlay'})
            .setDescription(`Automatically play the track: ${autoplay ? '**ON**' : '**OFF**'}`)
        ]})
    }
}
