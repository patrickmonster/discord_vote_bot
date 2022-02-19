const { MessageEmbed } = require('discord.js');

/**
 * 단순 강조 메세지
 * @param {title, main} msg 메세지 내용
 * @returns
 */
module.exports = function getMessage(msg) {
	const { title, content } = msg;
	return new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(content);
};