// const player = require('../../client/player.js');
const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube, SoundCloud, Spotify, a direct link etc.',
    aliases: ['p'],
    usage: '<song name>',
    category: 'Music',
    cooldown: 0,
    guildOnly: true,
    args: true,
    run: async (client, message, args) => {
        const string = args.join(' ')
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription(`You need to join a voice channel to use this feature.`)
        ]});

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

        const msg = await message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Query'})
            .setDescription(`Searching...`)
        ]})

        setTimeout(() => msg.delete() , 5000);

        client.distube.play(voiceChannel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}
