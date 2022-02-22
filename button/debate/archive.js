
const path = require("path");
const name = path.basename(__filename,".js");

/**
 * 아카이브 요청
 */
module.exports = {
	name,
	async execute(interaction, user, ...args) {
		const { guild, channel, client } = interaction;
		console.log("아카이브 요청");
	},
};