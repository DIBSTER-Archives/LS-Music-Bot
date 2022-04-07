module.exports = {
    TOKEN: '',
    px: '',
    playing: '',

opt: {
    DJ: {
        enabled: false,
        roleName: 'DJ',
        commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume']
    },
    selfDeaf: false,
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        }
    }
},
Settings: {
    LogChannelId: ""
}
};