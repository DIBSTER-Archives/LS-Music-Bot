const { QueueRepeatMode } = require('discord-player');
const Discord = require('discord.js');

module.exports = {
name: 'loop',
aliases: ['lp'],
utilization: '{prefix}loop <queue>',
voiceChannel: true,
    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        const NoMusicEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: No music in queue!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} There is currently no music playing! This command only works when a music is being played in queue.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        const DisableLoopModeEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: Disable Loop Mode!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} You should disable loop mode of existing music first **(${client.config.px}loop)**.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        if (!queue || !queue.playing) return message.channel.send({content: `${message.author.toString()}`, embeds: [NoMusicEmbed]});

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({content: `${message.author.toString()}`, embeds: [DisableLoopModeEmbed]});

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, The whole sequence will repeat non-stop 🔁` : `${message.author}, Something went wrong. ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}, In Loop mode you must disable existing queue first **(${client.config.px}loop queue)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Current music will be repeated non-stop (all music in the list **${client.config.px}loop queue**  You can repeat it with the option.) 🔂` : `${message.author}, ❌ Something went wrong.`);
};
    },
};