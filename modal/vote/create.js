const path = require("path");
const name = path.basename(__filename,".js");

const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

const createVote = require("#util/createVote");

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
	async execute(interaction, type, user, ...args) {
		const { client, components, guild, guildId, member } = interaction;

		const value = components.filter(({value}, i)=>value && i);
		switch(type){
			case "kick":
				guild.members.fetch(`${user}`).then(targetUser=>{
					interaction.reply({
						embeds  : [
							new MessageEmbed({
								title : `${member.displayName}님이 ${targetUser.displayName}님에 대한 추방 투표를 시작하였습니다.`,
								description : `
신청자 : ${member}
대상 : ${targetUser}
사유 : ${components[1].value}
								`
							})
						],
						components : [
							new MessageActionRow()
								.addComponents(
									new MessageButton({
										label: `찬성합니다.`, style: 'PRIMARY',
										customId: `vote add ${0} T`, // idx
										emoji: { name: '✔' },
									}),
									new MessageButton({
										label: `반대합니다.`, style: 'DANGER',
										customId: `vote add ${0} F`, // idx
										emoji: { name: '❌' },
									}),
								)
						]
					});
				})
				break;
			default:// 기본
				createVote(client,{
					title : `${member.displayName}님이 투표를 시작하였습니다.`,
					content : `
신청자 : ${member}
선택지 : ${value.map(({value})=>value).join(", ")}(${value.length}개)
내용 : ${components[0].value} 
							`, options : value, guildId, owner : member.id,
					max : "",
				})

				const messageActionRow = new MessageActionRow();
				for (const i in value){
					const v = value[i];
					messageActionRow.addComponents(
						new MessageButton({
							label: `${v.value}`, style: 'PRIMARY',
							customId: `vote add ${v.commandId} ${0}`, // idx
						}),
					)
				}

				interaction.reply({
					embeds  : [
					],
					components : [
						new MessageActionRow()
							.addComponents(
								new MessageButton({
									label: `찬성합니다.`, style: 'PRIMARY',
									customId: `vote add ${0} T`, // idx
									emoji: { name: '✔' },
								}),
								new MessageButton({
									label: `반대합니다.`, style: 'DANGER',
									customId: `vote add ${0} F`, // idx
									emoji: { name: '❌' },
								}),
							)
					]
				});
				break;

		}

		console.log(components);

	},
};