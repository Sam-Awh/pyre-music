const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'stop',
    description: 'Stop the current song and leave the voice channel.',
    aliases: ['leave', 'disconnect', 'dc'],
    usage: '',
    cooldown: 0,
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction)      
        queue.stop();
        client.distube.voices.leave(interaction);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor(`${process.env.EMBED_COLOR}`)
            .setAuthor({name: 'Disconnected.'})
            .setDescription('Disconnected from Voice Channel.')
        ]});
    }
}