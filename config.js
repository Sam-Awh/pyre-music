module.exports = {
    app: {
        px: 'm1',
        token: 'ODk5MzEwMDYyMjYxMTI1MTcw.YWw5ww.1SjB9Myi9gzMn5siRrC_DqLiHzY',
        playing: 'Music | P&P'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'filter', 'pause', 'resume', 'seek', 'skip']
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
