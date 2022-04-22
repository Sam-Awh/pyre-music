module.exports = {
    app: {
        px: 'm!',
        token: 'ODk5MzEwMDYyMjYxMTI1MTcw.YWw5ww.1SjB9Myi9gzMn5siRrC_DqLiHzY',
        playing: 'Music at Pyreworks!'
    },

    opt: {
        DJ: {
            enabled: true,
            roleName: 'DJ',
            commands: ['back', 'filter', 'pause', 'resume', 'seek', 'forceskip']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
