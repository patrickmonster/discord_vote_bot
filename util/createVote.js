const { vote } = require("#models")
const { MessageEmbed } = require("discord.js");
/**
 * 투표를 제작하여 디비에 넣음
 */
module.exports = function(client, data){ // 아카이브 문서 수정
    client._log("투표 제작");
    const {title, content, options, guildId } = data;
    options.map(({value, commandId})=>{
        const out = {};
        out[commandId] = value;
        return out;
    });
    return vote.create({
        // title : `투표입니다`
        title, content, guild_id : guildId,
    }).then(({idx, title, owner, start_at, guild_id, arg0, arg1,arg2,arg3, content, max})=>{
        return new MessageEmbed({
            title,
            description : content,
            author : { name : `${guild_id}-${idx}` },
            timestamp : start_at,
        })
    })
}