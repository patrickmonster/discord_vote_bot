const path = require("path");
const name = path.basename(__filename,".js");

const { debate } = require("#models");// 디비
const createUser = require("#util/createUser");// 디비
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
/**
 * 토론을 생성합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } type [ CHAT_INPUT, USER, MESSAGE ] 메세지 타입
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { boolean } defaultPermission 앱이 길드에 추가될때 기본적으로 활성화 되는지 여부
 */
// /channels/{channel.id}/messages/{message.id}/threads
// { name: 'echo', type: 2, default_permission: undefined }
module.exports = {
	name,
	type : 3, // [chat input, user, message]
	default_permission : true,
	execute(interaction,message) {
		const { member, guild,guildId, channel } = interaction;

		interaction.reply({content : `경고가 부여되었습니다! - 발언에 주의 해 주세요!` }).catch(_=>{});
	},
};

