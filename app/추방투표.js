const path = require("path");
const name = path.basename(__filename,".js");
/**
 * 추방 투표를 생성합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } type [ CHAT_INPUT, USER, MESSAGE ] 메세지 타입
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { boolean } defaultPermission 앱이 길드에 추가될때 기본적으로 활성화 되는지 여부
 */
module.exports = {
	name,
	type : 2, // [chat input, user, message]
	description : null,
	options : [],
	default_permission : true,
	execute(interaction,user) {
		const { client } = interaction;
		client._api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
			type : 9,
			data : {
				title : "추방 투표",
				custom_id: "vote create user",
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: `user ${user.id}`,
								label: "추방할 사용자",
								style: 1,
								min_length: 1,
								max_length: 100,
								placeholder: "추방 투표할 사용자입니다.",
								value :`${user.username}#${user.discriminator}`,
								required: false
							},
						],
					},
				]
			}
		}).catch(e=>{
			console.log(e.response);
		})
	},
};

