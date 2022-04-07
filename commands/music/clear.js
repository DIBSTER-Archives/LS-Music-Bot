const Discord = require('discord.js');

module.exports = {
name: 'clear',
aliases: [],
utilization: '{prefix}clear',
voiceChannel: true,
async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const NoMusicEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: No music in queue!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} There is currently no music playing! This command only works when a music is being played in queue.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        const NoMusicAfterEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.ErrorEmote2} Error: No music was playing after this song in queue!`)
        .setColor('RED')
        .setDescription(`${client.config.ErrorEmote} There is was no music playing after this song! This command only works when a song is in queue.`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

        const ClearEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.config.SuccessEmote2} Success: Music queue has been cleared!`)
        .setColor('GREEN')
        .setDescription(`${client.config.SuccessEmote} Music queue has been cleared!`)
        .setFooter({text: "Today at:", iconURL: client.user.displayAvatarURL({format: "png", size: 4096})})
        .setTimestamp()

    if (!queue || !queue.playing) return message.channel.send({content: `${message.author.toString()}`, embeds: [NoMusicEmbed]});

    if (!queue.tracks[0]) return message.channel.send({content: `${message.author.toString()}`, embeds: [NoMusicAfterEmbed]});

    await queue.clear();

    message.channel.send({content: `${message.author.toString()}`, embeds: [ClearEmbed]});
    },
};