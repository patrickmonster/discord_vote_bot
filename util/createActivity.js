const { query } = require("#models")
/**
 * 사용자 액션 기록
 * @param {*} id 타겟
 * @param {*} guildId 길드 
 * @param {*} user 사용자
 * @param {*} type 옵션
 */
module.exports = function createActivity(id, guildId, user, type) {
    query("INSERT",`
INTO vote.activity (id, guild, type, target) 
VALUES(?, ?, ?, ?)
    `, user, guildId, type, id).catch(_=>{});
};