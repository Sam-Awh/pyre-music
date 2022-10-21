const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: "Music",
    description: "Changes the volume of the current song.",
    usage: "<volume>",
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

        if (!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('You have not entered a number to change the volume!')
        ]});

        const volume = parseInt(args[0]);
        queue.setVolume(volume);

        message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Volume Changed'})
            .setDescription(`Changed the volume to **${volume}%**`)
        ]})
    }
}
