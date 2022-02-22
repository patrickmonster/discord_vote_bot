const commands = require('#util/commands'); // 커맨드 관리자

const path = require("path");
const name = path.basename(__filename,".js");


/**
 * 트수 인증용 패널을 생성합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } type [ CHAT_INPUT, USER, MESSAGE ] 메세지 타입
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { boolean } defaultPermission 앱이 길드에 추가될때 기본적으로 활성화 되는지 여부
 */
module.exports = {
	name, 
	type : "CHAT_INPUT",
	description : `${name} 관련 옵션입니다`,
	defaultPermission : true,
	...commands(path.join(__dirname, name))
};