const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: "filter",
    aliases: ["filter"],
    category: "Music",
    description: "Filter the queue.",
    usage: "",
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
            .setDescription(`Please choose a suitable filter!
            \nFilter list: \`3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverb, surround, mcompand, phaser, tremolo, earwax\``)
        ]})

        if(args[0] === 'off' && queue.filter?.length) queue.setFilter(false);
        else if(Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0]);
        else if(args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('No matching filters found!')
        ]})

        message.reply({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Filter'})
            .setDescription(`Changed the filter to: **${queue.filters.join(', ') || 'Off'}**`)
        ]})
    }
}
