const path = require("path");
const name = path.basename(__filename,".js");

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

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
		const { client, components, guild, guildId, member, channel } = interaction;

		const value = components.filter(({value}, i)=>value && i);
		let vote_data
			, messageActionRow = new MessageActionRow();
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
				vote_data = {
					title : `${member.displayName}님이 투표를 시작하였습니다.`,
					content : `
신청자 : ${member}
선택지 : ${value.map(({value})=>value).join(", ")}(${value.length}개)
내용 : ${components[0].value} 
							`, options : value, guildId, owner : member.id,
					max : channel.isThread() ? channel.memberCount : parseInt(guild.memberCount / 2),
				};
				break;
		}
		createVote(client,vote_data).then(embed =>{
			console.log(embed);
			const component = new MessageActionRow();
			for (const i of ["arg0","arg1","arg2","arg3"]){
				console.log(i, embed[i]);
				if(embed[i])
					component.addComponents(
						new MessageButton({
							label: `${embed[i]}`, style: 'DANGER',
							customId: `vote add ${embed.idx} ${i}`, // idx
						})
					);
			}
			console.log(component);
			interaction.reply({
				embeds : [ new MessageEmbed({
					title : embed.title,
					description : embed.content,
					timestamp : embed.start_at,
				})],
				components : [component]
			})
		})

		console.log(components);

	},
};