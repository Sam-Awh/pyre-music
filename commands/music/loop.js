const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    category: "Music",
    description: "Repeat the current song/queue.",
    usage: "loop",

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

        let mode = null;
        if(!args[0]) {
            mode = 0;
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED') 
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('Choose a valid option!')
                .addFields({ name: 'off', value: 'Don\'t repeat the track/queue.', inline: true},
                { name: 'song', value: '┕Repeat the track (song).', inline: true},
                { name: 'queue', value: '┕Repeat the entire queue.', inline: true},)
            ]})
        }

        switch (args[0]) {
        case 'off':
            mode = 0
            break
        case 'song':
            mode = 1
            break
        case 'queue':
            mode = 2
            break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Queue' : 'Track') : 'OFF'
        message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Loop'})
            .setDescription(`Loop Mode has been updated to: **${mode}**!`)
        ]})
    }
}
