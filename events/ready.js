//Requires the package.
const Execute = require('child_process').exec;

//Requiring the configuration file.
const Configuration = require('../config.js');

module.exports = async (client) => {
    console.log(`${client.user.username} Login!`);

    function GetFromGitHub(){
        Execute(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                } else {
                    client.channels.cache.get(Configuration.Settings.LogChannelId).send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting Discord Bot.**");
                    setTimeout(() => {
                        process.exit();
                    }, 1000);
                };
            };
        });
        };
    
        setInterval(() => {
            GetFromGitHub();
        }, 30 * 1000);
};