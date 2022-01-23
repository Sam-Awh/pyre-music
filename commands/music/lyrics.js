const { MessageEmbed } = require('discord.js');
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
      const queue = player.getQueue(message.guild.id);

      if (!queue && !args[0]) return message.channel.send(`Specify a track ${message.author}... try again ? ❌`);

     const song = await lyricsClient.search(args[0] ? args.join(' ') : queue.current.title);

     if (song === null) return message.channel.send(`🚫 | Could not find lyrics for this song! Please retry or search for an other track!`);

      const embed = new MessageEmbed()
       embed.setTitle(`**LYRICS | ${song.title}**`)
       embed.setColor('ORANGE');
       embed.setDescription(song.lyrics.length > 1900 ? song.lyrics.substr(0, 1897) + '...' : song.lyrics)
       embed.setTimestamp();
       embed.setFooter('© Pyreworks', message.author.avatarURL({ dynamic: true }));

      message.channel.send({embeds:[embed]})     
    },
};