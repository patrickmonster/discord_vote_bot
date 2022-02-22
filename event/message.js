const { query } = require("#models");
const createActivity = require("#util/createActivity");
// debate
module.exports = function(message) {
	const { /*content,*/ author, client, channel, guildId ,channelId, id } = message;
	// const [commend, ...args] = content.split(' ');
	if (!channel.isText() || author.bot) return;
	// ///////////////////////////////////////////////////////////////////////////////////////////
	if(channel.isThread()){ // 메시지 전송기록 - 길드 / 스레드 메세지
		query("INSERT", `
INTO debate_message (id, guild, channel, owner_id)
SELECT ? AS id, guild, channel, ? AS owner_id
FROM debate
WHERE guild = ?
AND channel = ?
		`, id, author.id, guildId, channelId).then(()=>{
			// createActivity(id, guildId, author.id, 'd');
		}).catch(_=>{});
	}else if(client.witelist?.includes(author.id)){// 관리자 명령 - DM채널
		// 일단 생략
	}else{// 메세지 작성기록
		createActivity(id, guildId, author.id, 'MW');
	}
};