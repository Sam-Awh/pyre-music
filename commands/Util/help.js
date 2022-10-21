const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags')
require("dotenv").config();

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Util',
    usage: 'm!help [command]',
    description: 'Get command usage info.',

    async run (client, message, args) {
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll (client, message) {
    const helpEmbed = new MessageEmbed()
    .setColor(`${process.env.EMBED_COLOR}`)
    .setTitle(`All Commands`)
    .addFields({name: 'Play', value: '┕`Play a song from YouTube, SoundCloud, Spotify, \nMixer, Twitch, Bandcamp, or a direct link.`'},
    {name: 'Pause', value: '┕`Pause the current song.`'},
    {name: 'Resume', value: '┕`Resume the current song.`'},
    {name: 'Shuffle', value: '┕`Randomize the queue.`'},
    {name: 'Loop', value: '┕`Repeat the queue/track.`'},
    {name: 'Filter', value: '┕`Use filters like `3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverb, surround, mcompand, phaser, tremolo, earwax`'},
    {name: 'NowPlaying', value: '┕`Show information about the current track.`'},
    {name: 'Queue', value: '┕`Show the playlist.`'},
    {name: 'Seek', value: '┕`Move to a certain part of the track\'s duration.`'},
    {name: 'Skip', value: '┕`Skip the current track.`'},
    {name: 'Volume', value: '┕`Adjust the volume of playback. (default: 50%)`'},
    {name: 'Stop', value: '┕`Stop playback and disconnect the bot from the VC.`'},
    {name: 'AutoPlay', value: '┕`Play a track automatically.`'})
    .setFooter({text: `Use m!help [command name] for more details!`})

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(' | ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    helpEmbed.setDescription(info);
    return message.channel.send({embeds: [helpEmbed]});
}

function getCMD(client, message, input) {
    const usageEmbed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))

    if (cmd.name) info = `**Command Name |** ${cmd.name}`
    if (cmd.aliases) info += `\n**Alias |** ${cmd.aliases.map(a => `\`${a}\``).join(',')}`
    if (cmd.description) info += `\n**Command Info |** ${cmd.description}`
    if (cmd.usage) {
        info += `\n**Usage:** ${cmd.usage}`;
        usageEmbed.setFooter({text: "<> = required, [] = optional"})
    }
    return message.channel.send({embeds: [usageEmbed.setColor('#FF4D27').setDescription(info)]})
}
