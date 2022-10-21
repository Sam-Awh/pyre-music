const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    usage: 'skip',

    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('No songs currently playing.')
            ]})
        }

        queue.skip();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Skip'})
            .setDescription('Song skipped.')
        ]})
    }
}
