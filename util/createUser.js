const { user : t_user } = require("#models");// 디비
/**
 * 단순 강조 메세지
 * @param {title, main} msg 메세지 내용
 * @returns
 */
module.exports = function createUser(id,guild) {
    return t_user.findOrCreate({ where : { id, guild } })
};