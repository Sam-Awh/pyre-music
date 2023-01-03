const client = require("../index");

client.on("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `${client.user.tag} is ready to go!`)
    const statuses = [ // status message
        "music!",
    ]
    let index = 0
    setInterval(() => {
        if (index === statuses.length) index = 0
        const status = statuses[index]
        client.user.setActivity(`${status}`, {
            type: "PLAYING",
            browser: "DISCORD IOS"
        })
        index++
    }, 10000)
})
