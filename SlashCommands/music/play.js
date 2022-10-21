// const player = require('../../client/player.js');
require("dotenv").config();

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube, SoundCloud, Spotify, Mixer, Twitch, Bandcamp, or a direct link.',
    aliases: ['p'],
    usage: '<song name>',
    category: '🎵 - Music',
    options: [
        {
            name: 'song_name_url',
            description: 'Song name (or) URL.',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const string = interaction.options.getString('song_name_url')

        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)

        await interaction.followUp("**Query in process...**")
        await interaction.followUp("Query completed successfully.")
        client.distube.play(voiceChannel, string, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}