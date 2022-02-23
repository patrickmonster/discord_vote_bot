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
		const { client, member } = interaction;
		if(client.user.id == user.id){
			interaction.reply({ content : "현 봇은 추방투표로 추방이 불가능 합니다!" });
		// }else if(member.id == user.id){
		// 	interaction.reply({ content : "자기 자신을 추방투표로 추방이 불가능 합니다!" });
		}else
		client._api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
			type : 9,
			data : {
				title : "추방 투표",
				custom_id: `vote create kick ${user.id}`,
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
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: `reason`,
								label: "추방사유",
								style: 2,
								min_length: 1,
								max_length: 1000,
								placeholder: "다른사람이 보더라도, 납득 가능한 내용을 적어주세요!",
								required: true
							},
						],
					}
				]
			}
		}).catch(e=>{
			console.log(e.response);
		})
	},
};

