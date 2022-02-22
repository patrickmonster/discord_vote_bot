
const path = require("path");
const name = path.basename(__filename,".js");

/**
 * 아카이브 요청
 */
module.exports = {
	name,
	description : "이모티콘을 등록 및 업데이트 합니다",
	type : "SUB_COMMAND",
	channelTypes : ["GUILD_TEXT"],
	required : false,
	async execute(interaction, user, ...args) {
	async execute(interaction, user, ...args) {
		const { guild, channel, client } = interaction;
		console.log("아카이브 요청");
	},
};