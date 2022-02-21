const { query } = require("#models")
const axios = require("axios");
/**
 * 채널 삭제 이벤트 -토론 종료하기
 * @param {*} channel 삭제된 채널
 * @returns 
 */
module.exports = function(oldThread, newThread) {
	// .locked
	if(oldThread.locked != newThread.locked){// 스레드 잠금 상태변경
		if(oldThread.locked){// 닫침
			console.log(`아카이브 닫침 - ${oldThread.id}`);
			query("UPDATE",` debate SET end_at=now() WHERE channel=? AND guild=? `, oldThread.channelId, oldThread.guildId);
		}else{// 열림 (24시간동안 연장되기 때문에 현재시간 + 1일)
			console.log(`아카이브 열림 - ${oldThread.id}`);
			query("UPDATE",` debate SET end_at=DATE_ADD(now(), INTERVAL 1 DAY) WHERE channel=? AND guild=? `, oldThread.channelId, oldThread.guildId);
		}
	}
};