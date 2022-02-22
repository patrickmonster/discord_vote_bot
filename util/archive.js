const { query, debate } = require("#models")
const getMessage = require("./getMessage")
/**
 * 아카이브 된 문서를 공식 서버에 던짐
 * 수정 및 전송
 * 
 * 해당 문서를 아카이브 할 때에 발생하는 이벤트
 * 945512543726764072
 * kDED53dQhJT5IrwIfe0pUPDHF7fYcCSr2OCNPud_mT5Qp77iipsIWb93QBBJRYCXWJV_
 */
module.exports = function(client, ...channels){ // 아카이브 문서 수정
    const hook = client._webhooks.get("archive");
    client._log("아카이브 수정 요청",channels);
    query("SELECT", `
    topic
    , owner
    , channel
    , start_at
    , end_at
    , guild
    , event
    , public_yn
    , message
FROM vote.debate
WHERE channel in (?)
    `, channels).then((debates)=>{
        if(!debates.length)return;
        for(const {topic, owner, channel, start_at, end_at, guild, event, public_yn, message} of debates){
            let target = message ? "editMessage" : "send";
            console.log(topic, owner, channel, start_at, end_at, guild, event, public_yn, message);
            hook[target]({
                embeds : [
                    getMessage({
                        title : `${channel}`,
                        content : `
아카이브(${public_yn == 'N' ? "비공개" : topic})
<t:${Math.floor(start_at.getTime() / 1000)}> ~ ${end_at ? "<t:" + Math.floor(end_at.getTime() / 1000) + ">" : "진행중"}
${guild}(${event})
                        `
                    }).setAuthor({ name : `${owner}`, url : `https://discord.com/channels/${guild}/${channels}` }).setColor(end_at > Date.now() ? "#0099ff" : "RED")
                ]
            }).then(message=>{
                // return debate.update({ message : message.id }, { where : { channel : `${channel}` } })
            }).catch(e=>{
                console.log(e);
            });
        }//
    }).catch(e=>{
        console.error("아카이브 수정]",e);
    })
}