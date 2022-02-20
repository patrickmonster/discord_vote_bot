const { query } = require("#models")
const axios = require("axios");
/**
 * 채널 삭제 이벤트 -토론 종료하기
 * @param {*} channel 삭제된 채널
 * @returns 
 */
module.exports = function(channel) {
	const { id, client, guildId } = channel;
	console.log(channel.id, "삭제 이벤트");
	query("SELECT",`event FROM vote.debate WHERE channel = ?`, id).then(([{event}])=>{
		axios.delete(`https://discord.com/api/guilds/${guildId}/scheduled-events/${event}`,{ headers : { Authorization : `Bot ${client.token}` } }).catch(_=>{});
		return query("UPDATE",` debate SET end_at=now() WHERE channel=? AND guild=? `, channel.id,channel.guildId); // 종료상태로 변경
	}).catch(_=>{});
};