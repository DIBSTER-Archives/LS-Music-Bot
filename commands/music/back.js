const Discord = require('discord.js');

module.exports = {
name: 'back',
aliases: [],
utilization: '{prefix}back',
voiceChannel: true,
async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const NoMusicEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: No music in queue!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} There is currently no music playing! This command only works when a music is being played in queue.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        const NoMusicBeforeEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: No music was playing before in queue!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} There is was no music playing before this song! This command only works when a song in queue was already played.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        const PreviousEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.SuccessEmote2} Success: Previous song is now playing!`)
        .setColor('GREEN')
        .setDescription(`${client.config.SuccessEmote} Previous song in queue has started to play!`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        if (!queue || !queue.playing) return message.channel.send({content: `${message.author.toString()}`, embeds: [NoMusicEmbed]});

        if (!queue.previousTracks[1]) return message.channel.send({content: `${message.author.toString()}`, embeds: [NoMusicBeforeEmbed]});

        await queue.back();

        message.channel.send({content: `${message.author.toString()}`, embeds: [PreviousEmbed]});
    },
};