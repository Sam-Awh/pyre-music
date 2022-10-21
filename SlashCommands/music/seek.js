const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'seek',
    description: 'Rewind the song to a specified position.',
    usage: 'seek <time>',
    options: [
        {
            name: 'time',
            description: 'Incoming song rewind time (in milliseconds)',
            type: 'NUMBER',
            required: false,
        }
    ],
    run: async(client, interaction, args) => {
        const time = interaction.options.getNumber('time');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('No songs currently playing.')
        ]})

        if(!time) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription(`You must choose a timeline to rewind! ( < ${queue.songs[0].duration}ms )`)
        ]})

        if(time > queue.songs[0].formattedDuration) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('Rewind time cannot be greater than song duration.')
        ]})

        queue.seek(time);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Seek'})
            .setDescription(`Seeked to **${time}ms | ${queue.songs[0].duration}ms**`)
        ]})
    }
}