module.exports = {
    app: {
        px: 'm!',
        token: 'token goes here',
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
