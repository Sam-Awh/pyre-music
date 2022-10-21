const { MessageEmbed } = require('discord.js');
require("dotenv").config();

const Format = Intl.NumberFormat();
const status = queue =>
`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'OFF'}\` | Looped: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlists' : 'Current Song') : 'OFF'
  }\` | Autoplay: \`${queue.autoplay ? 'ON' : 'OFF'}\``

module.exports = {
    name: "nowplaying",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor(`${process.env.EMBED_COLOR}`)
        .setAuthor({name: 'Currently Playing...'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        interaction.followUp({embeds: [embed]});
    }
}
