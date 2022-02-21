const { query } = require("#models");
const getMessage = require("#util/getMessage");
const axios = require("axios");
/**
 * 채널 삭제 이벤트 -토론 종료하기
 * @param {*} channel 삭제된 채널
 * @returns 
 */
module.exports = function(channel) {
	const { id, client, guildId, parent } = channel;
	console.log(channel.id, "삭제 이벤트");
	query("SELECT",`event, topic FROM vote.debate WHERE channel = ?`, id).then(([{event, topic}])=>{
		axios.delete(`https://discord.com/api/guilds/${guildId}/scheduled-events/${event}`,{ headers : { Authorization : `Bot ${client.token}` } }).catch(_=>{});
		parent.send({
			embeds : [
				getMessage({
					title : `${topic}`,
					content : `
토론(${id})이 제거되었습니다.
해당 아카이브 토론은 복원 및 복구 불가능 합니다.
 * 해당 아카이브 메시지 전송 기록은 존재하지만,
	전채 내용은 시각화가 불가능 합니다!
					`
				})
			]
		})
		return query("UPDATE",` debate SET end_at=now() WHERE channel=? AND guild=? `, channel.id,channel.guildId); // 종료상태로 변경
	}).catch(_=>{});
};