// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = async function(interaction) {
	const { commandId , client } = interaction; 

	const [commend, ...args] = commandId .split(' '); // 명령어 처리
	const c = client.system_modal.get(commend);
	if (c) {
		c.execute(interaction,...args);
	}else {
		interaction.deferReply({ 
			content : "명령을 찾지 못하였습니다.",
			ephemeral: true 
		});
	}
};