const path = require("path");
const name = path.basename(__filename,".js");

const { debate } = require("#models");// 디비
const createUser = require("#util/createUser");// 디비
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
/**
 * 토론을 생성합니다.
 * @param { String } name 이름
 * @param { String } description 설명
 * @param { String } type [ CHAT_INPUT, USER, MESSAGE ] 메세지 타입
 * @param { String } channelTypes [GUILD_TEXT, DM] 채널 타입
 * @param { boolean } defaultPermission 앱이 길드에 추가될때 기본적으로 활성화 되는지 여부
 */
// /channels/{channel.id}/messages/{message.id}/threads
// { name: 'echo', type: 2, default_permission: undefined }
module.exports = {
	name,
	type : 3, // [chat input, user, message]
	default_permission : true,
	execute(interaction,message) {
		const { member, guild,guildId, channel } = interaction;
		if(message.hasThread){
			interaction.reply({content : "해당주제의 토론은 이미 시작되었습니다!", ephemeral : true }).catch(_=>{});
			return;
		}

		if(channel.isThread()){
			interaction.reply({content : "여긴 토론을 생성할 수 없는 채널입니다!", ephemeral : true }).catch(_=>{});
			return;
		}
		interaction.reply({content : "토론을 생성합니다...!" }).catch(_=>{});
		
		createUser(member.id, guildId).then(()=>
			message.startThread( {
				name : `${message.content}에 대한 토론`, // 
				reason : `${member.nickname}님이 토론을 생성함`, // 이유
				rateLimitPerUser : 20,// 채팅 속도
			})
		).then(channel=>{// 스레드 채널
			// 스레드 생성 후 해당하는 채널을 모니터링 영역에 삽입
			return debate.create({
				topic : message.content || "이미지",// 혹은 파일에 대한 토론 - 토론주제
				owner : `${member.id}`,/// 토론 시작 -> 생성자
				channel : `${channel.id}`, // 토론하는 스레드 (스레드만 가능) -> 차후 변경의 소지가 있음
				guild : `${guildId}`, // 진행중인 길드
			}).then(_=>{ // 스레드에 종료 메세지 투척
				const title = message.content || "첨부파일 주제로 토론이 시작되었습니다!";
				channel.send({
					content : "토론이 생성되었습니다!",
					embeds : [
						new MessageEmbed({ title, // 클릭시 해당 메세지로 이동
							url  : `https://discord.com/channels/${guildId}/${channel.id}/${message.id}`,
							author  : {  name : member.nickname, icon_url : member.avatarURL() },
							thumbnail : { url : "https://cdn.discordapp.com/attachments/944791977755541595/944792022714298388/chart-column-solid.png" },
							description : `
\`\`\`
말씨는 언제나 존댓말을 씁니다.
자신의 지식의 한계를 벗어나는 토론 주제에 끼어드는 일은 자제합니다.
자신의 다른 의견이나 또는 질문은 토론 주제에서 벗어나지 않도록 하며 그리고 되도록 짧게 합니다.
객관성이 결여된 개인적인 판단에 의거한 주장을 내세우지 않도록 합니다.
자신이 쓴 글이 수정 혹은 삭제되었다고 하여서 기분이 상하여 토론의 주제에서 벗어나 토론 상대자를 헐뜯지 않도록 합니다. 
토론 상대자의 사용자 이름을 지칭하였을 때에는 그 상대자와 얼굴을 마주하고 있지 않다는 점을 이용하여 상대자의 인격에 흠이 가는 낱말은 절대로 쓰지 않도록 합니다.
토론 문서에 글을 쓰고 나서 상대자 또는 다른 참여자의 답변을 기다리는 인내를 갖도록 합니다.
\`\`\`

							`,
						})
					],
					components : [
						new MessageActionRow()
							.addComponents(
								new MessageButton({
									label: `토론종료`, style: 'PRIMARY',
									customId: `debate ${channel.id} close`,
									emoji: { name: '❌' },
								}),
								new MessageButton({
									label: `토론내용을 XML`, style: 'PRIMARY',
									customId: `debate ${channel.id} xml`,
									emoji: { name: '📈' },
								}),
							),
					]
				});
				const stime = new Date();// 현재시간
				const etime = new Date();// 현재시간
				stime.setMinutes(stime.getMinutes() + 1);// 1분뒤 시작을 알림
				etime.setDate(etime.getDate() + 1);// 24시간 뒤에 종료알림
				
				return guild.scheduledEvents.create({
					name : `${title}에 대한 토론이 시작되었습니다.`,
					scheduledStartTime : stime,
					scheduledEndTime : etime, // 끝나는 시간
					privacyLevel : "GUILD_ONLY", // PUBLIC / GUILD_ONLY
					entityType : "EXTERNAL", // NONE STAGE_INSTANCE VOICE EXTERNAL
					description  : `${member}님이 ${title}에 대한 토론을 시작하였습니다.`,
					entityMetadata : { location : `<#${channel.id}>` }, // 위치
					reason : "-", // 이유
				});//GuildScheduledEvent
			}).then(event=>debate.update({ event : event.id }, { where : { channel : `${channel.id}` } }));
		}).then(_=>{ // 토론이 성공적으로 생성됨
			interaction.editReply({content : `${message.content || "첨부파일 주제로 토론이 시작되었습니다!"} - 토론이 생성되었 습니다.` }).catch(_=>{});
		}).catch(e=>{
			console.error(e);
			interaction.editReply({content : "권한문제로 토론 생성에 실패하였습니다 8ㅅ8" }).catch(_=>{});
		})
	},
};

