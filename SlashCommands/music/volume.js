const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'volume',
    description: 'Changes the volume of the current song.',
    usage: '<volume>',
    options: [
        {
            name: 'volume',
            description: 'The volume to set the music to.',
            type: 'NUMBER',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const volume = interaction.options.getNumber('volume');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('No songs currently playing.')
        ]})

        queue.setVolume(volume);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Changed Volume'})
            .setDescription(`Changed the volume to **${volume}%**`)
        ]})
    }
}