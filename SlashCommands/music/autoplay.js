const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'autoplay',
    description: 'Toggles autoplay ON/OFF.',
    usage: 'autoplay',
    run: async(client, interaction,args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('No songs currently playing.')
            ]})
        }
        const autoplay = queue.toggleAutoplay();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'AutoPlay'})
            .setDescription(`AutoPlay is currently turned ${autoplay ? '**ON**' : '**OFF**'}`)
        ]})
    }
}