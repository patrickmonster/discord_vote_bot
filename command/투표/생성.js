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
	description : "투표를 생성합니다.",
	type : 1,
	channelTypes : ["GUILD_TEXT"],
	required : false,
	async execute(interaction, user, ...args) {
		const { client } = interaction;
		client._api.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
			type : 9,
			data : {
				title : "투표 생성",
				custom_id: "vote create",
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "title",
								label: "설명",
								style: 2,
								min_length: 10,
								max_length: 4000,
								placeholder: "주제를 작성 해 주세요!",
								required: true
							},
						],
					},
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "arg0",
								label: "1번항목",
								style: 1,
								min_length: 1,
								max_length: 100,
								placeholder: "항목을 작성해 주세요",
								required: true
							},
						],
					},
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "arg1",
								label: "2번항목",
								style: 1,
								min_length: 1,
								max_length: 100,
								placeholder: "항목을 작성해 주세요",
								required: false
							},
						],
					},
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "arg2",
								label: "3번항목",
								style: 1,
								min_length: 1,
								max_length: 100,
								placeholder: "항목을 작성해 주세요",
								required: false
							},
						],
					},
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: "arg3",
								label: "4번항목",
								style: 1,
								min_length: 1,
								max_length: 100,
								placeholder: "항목을 작성해 주세요",
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