const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'resume',
    description: 'Resume a paused song.',
    usage: 'resume',
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

        queue.resume();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Resume'})
            .setDescription('Resumed song.')
        ]})
    }
}