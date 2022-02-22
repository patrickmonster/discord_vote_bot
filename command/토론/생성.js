const getTitle = require('#discord/getTitle');

const path = require("path");
const name = path.basename(__filename,".js");

/**
 * 현재 사용자의 맨트를 출력합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { { name, value } } choices 선택지
 * @param { String } type [SUB_COMMAND : 보조명령, SUB_COMMAND_GROUP : 보조명령 그룹
 * 		, STRING : 문자열, INTEGER : 정수, BOOLEAN : 절대값, USER : 사용자, CHANNEL : 채널
 * 		, ROLE : 역할, MENTIONABLE : 사용자 or 역할, NUMBER : 정수]
 */
module.exports = {
	name,
	description : "토론을 생성합니다.",
	type : "SUB_COMMAND",
	channelTypes : ["GUILD_TEXT"],
	required : false,
	async execute(interaction, user, ...args) {
		// 
	},
};