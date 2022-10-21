const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue.',
    usage: '',
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setAuthor({name: 'Something went wrong...'})
            .setDescription('No songs currently playing.')
        ]})

        queue.shuffle();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Shuffle'})
            .setDescription('Shuffled the playlist.')
        ]})
    }
}