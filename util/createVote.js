const { vote } = require("#models")
const { MessageEmbed } = require("discord.js");
/**
 * 투표를 제작하여 디비에 넣음
 */
module.exports = function(client, data){ // 아카이브 문서 수정
    const {title, content, options, guildId, owner, max } = data;
    client._log("투표 제작 -", title);
    const query = {
        title, content, guild_id : guildId, owner, max
    };
    
    options.forEach(({value, commandId})=>{
        query[commandId] = value;
    });
    console.log(query);
    return vote.create(query);///쿼리 반환
}