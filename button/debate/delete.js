const getMessage = require('#discord/getMessage');
const getEmotes = require('#twitch/getEmotes');

module.exports = {
	name: 'emote',
	async execute(interaction, user, ...args) {
		const { guild, channel, client } = interaction;
		console.log("제거요청");	
	},
};