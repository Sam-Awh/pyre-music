const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'pause',
    description: 'Stop playing the music currently playing.',
    usage: 'pause',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('No songs currently playing.')
            ]})
        }

        queue.pause();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Pause'})
            .setDescription('Song paused.')
        ]})
    }
}