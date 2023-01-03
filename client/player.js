const { DisTube } = require('distube');
const client = require("../index.js");
const { MessageEmbed } = require('discord.js');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
// const { YouTubeDLPlugin } = require("@distube/yt-dlp")
const Format = Intl.NumberFormat();
const config = require('../config.json')
require("dotenv").config();

let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: false
};

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  youtubeCookie: `${process.env.YT_API}`,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})
if(config.spotifyapi.enabled) {
  spotifyoptions.api = {
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_API_SECRET,
  }}

const status = queue =>
  `Volume: \`${queue.volume}%\`
   | Filters: \`${queue.filters.join(', ') || 'Off'}\`
    | Repeat: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlist' : 'Song') : 'Off'}\`
     | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube.on('addSong', (queue, song) =>
  queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor(`${process.env.EMBED_COLOR}`)
      .setAuthor({name: 'Song Added'})
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .addFields({ name: "Status | ", value: `┕
      ┕${status(queue).toString()}`, inline: false},
      { name: 'Views/Listeners | ', value: `┕
      ┕${Format.format(song.views)}`, inline: true},
      { name: 'Likes | ', value: `┕
      ┕${Format.format(song.likes)}`, inline: true},
      { name: 'Duration | ', value: `┕
      ┕${song.formattedDuration}`, inline: true},
      { name: "Added by | ", value: `┕
      ┕${song.user}`, inline: true})
  ]})
)

client.distube.on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor(`${process.env.EMBED_COLOR}`)
        .setAuthor({name: 'Playlist Added'})
        .setDescription(`Added [${playlist.name}](${playlist.url}) (${playlist.songs.length} songs) to playlists.`)
        .setThumbnail(playlist.thumbnail)
        .addFields({ name: "Status | ", value: `
        ┕${status(queue).toString()}`, inline: false},
        { name: 'Duration | ', value: `
        ┕${playlist.formattedDuration}`, inline: true},
        { name: "Added by | ", value: `
        ┕${playlist.user}`, inline: true})
    ]})
)

client.distube.on('playSong', (queue, song) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor(`${process.env.EMBED_COLOR}`)
        .setAuthor({name: 'Currently Playing'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addFields({ name: "Status | ", value: `
        ┕${status(queue).toString()}`, inline: false},
        { name: 'Uploaded by | ', value: `
        ┕[${song.uploader.name}](${song.uploader.url})`, inline: true},
        { name: 'Views/Listeners | ', value: `
        ┕${Format.format(song.views)}`, inline: true},
        { name: 'Likes | ', value: `
        ┕${Format.format(song.likes)}`, inline: true},
        { name: 'Duration | ', value: `
        ┕${song.formattedDuration}`, inline: true},
        { name: 'Download | ', value: `
        ┕[Click Here](${song.streamURL})`, inline: true},
        { name: "Added by | ", value: `
        ┕${song.user}`, inline: true},
        { name: 'Playing music at', value: `
        ┕ | ${client.channels.cache.get(queue.voiceChannel.id)}
        ┕ | ${queue.voiceChannel.bitrate / 1000}  kbps`, inline: false},
        { name: "Query | ", value: `[${song.related[0].name}](${song.related[0].url})
        ┕ | Duration: ${song.related[0].formattedDuration} | Posted by: [${song.related[0].uploader.name}](${song.related[0].uploader.url})`, inline: false})
    ]})
  )
  .on('error', (channel, e) => {
    channel.send(`| An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send({embeds: [
      new MessageEmbed()
      .setColor(`${process.env.EMBED_COLOR}`)
      .setAuthor({name: 'Finished'})
      .setDescription('Finished playing.')
    ]}))
  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds: [
        new MessageEmbed()
        .setColor('RED')
        .setAuthor({name: 'Something went wrong...'})
        .setDescription(`No song found with keyword | \`${query}\``)
    ]})
  )
  .on('finish', queue => queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor(`${process.env.EMBED_COLOR}`)
      .setAuthor({name: 'Finished'})
      .setDescription('Finished playing.')
    ]}))

