const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'loop',
    description: 'Loop the current song/queue.',
    usage: 'loop',
    options: [
        {
            name: 'loop',
            description: 'Repeat mode',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'OFF',
                    value: 'off'
                }, 
                {
                    name: 'Current_Song',
                    value: 'song'
                },
                {
                    name: 'Queue',
                    value: 'queue'
                }
            ]
        }
    ],

    run: async(client, interaction, args) => {
        const loop = interaction.options.getString('loop');
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: 'Something went wrong...'})
                .setDescription('No songs currently playing.')
            ]})
        }

        if(loop == 'off') {
            queue.setRepeatMode(0);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor(`${process.env.EMBED_COLOR}`)
                .setAuthor({name: 'Loop OFF'})
                .setDescription('Loop mode has been turned OFF.')
            ]})
        } else if(loop == 'song') {
            queue.setRepeatMode(1);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor(`${process.env.EMBED_COLOR}`)
                .setAuthor({name: 'Track Loop ON'})
                .setDescription('Track Loop mode has been turned ON.')
            ]})
        } else if (loop == 'queue') {
            queue.setRepeatMode(2);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor(`${process.env.EMBED_COLOR}`)
                .setAuthor({name: 'Queue Loop ON'})
                .setDescription('Queue Loop mode has been turned ON.')
            ]})
        }
    }
}
