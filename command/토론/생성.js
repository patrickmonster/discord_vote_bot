const path = require("path");
const name = path.basename(__filename,".js");

/**
 * 현재 사용자의 맨트를 출력합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { { name, value } } choices 선택지
 * @param { int } type [SUB_COMMAND : 보조명령, SUB_COMMAND_GROUP : 보조명령 그룹
 * 		, STRING : 문자열, INTEGER : 정수, BOOLEAN : 절대값, USER : 사용자, CHANNEL : 채널
 * 		, ROLE : 역할, MENTIONABLE : 사용자 or 역할, NUMBER : 정수]
 */
module.exports = {
	name,
	description : "토론을 생성합니다.",
	type : 1,
	channelTypes : ["GUILD_TEXT"],
	required : false,
	async execute(interaction, user, ...args) {
		const { client } = interaction;
		client._api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
			type : 9,
			data : {
				title : "토론 생성",
				custom_id: "debate create",
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "title",
								label: "토론주제",
								style: 2,
								min_length: 1,
								max_length: 100,
								placeholder: "주제를 작성 해 주세요!",
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