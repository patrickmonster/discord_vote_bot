const clickCommand = require('#event/clickCommand');
const clickButton = require('#event/clickButton');
const clickMenu = require('#event/clickMenu');
const clickApp = require('#event/clickApp');

function interactionSwitch(interaction){
	switch(interaction.targetType){
		case "USER" : // 유저 명령 (관리자)
			return clickApp(interaction);
		case "MESSAGE": // 메세지 명령 (관리자)
			return clickApp(interaction, interaction.options.getMessage("message").content);
		case "CHAT_INPUT": // 
			return clickCommand(interaction); // 명령 입력
		default: // 버튼 및 기타 이벤트
			interaction.isButton() && clickButton(interaction); // 버튼클릭
			interaction.isSelectMenu() && clickMenu(interaction); // 매뉴클릭
			interaction.isCommand() &&  clickCommand(interaction); // 명령 입력
	}
}

/**
 * 인터렉선 처리
 * @param {*} interaction 
 * @returns 
 */
module.exports = function(interaction) {
	if (!interaction.inGuild() || interaction.user.bot) return;
	if (interaction.customId?.startsWith("F")){
		interactionSwitch(interaction);
	}else interaction.deferReply({fetchReply : false, ephemeral: true}).then(()=>{
		interactionSwitch(interaction);
	}).catch(_=>{
		interaction.client._log(`Error to Interaction ${interaction.targetType}`);
	}); // 응답실패
};