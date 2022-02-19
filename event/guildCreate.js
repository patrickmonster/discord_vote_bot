const { guild : t_guild } = require('#models');
const webhooks = require('#util/webhooks'); // 커맨드 관리자
const getMessage = require('#util/getMessage'); // 커맨드 관리자

// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = function(guild) {
    t_guild.upsert({ 
        id : guild.id,
        name : guild.name,
        icon : guild.icon,
        member_count : guild.memberCount,
        ownerId : guild.ownerId,
    }).catch(e=>{
        console.error(e);
    });
    guild.fetchOwner({ force: true }).then(owner=>{
        webhooks('guild', 'New Guild',
            getMessage({ title: `${guild.name}`, content: `${guild.name}(${guild.id})` })
            .setThumbnail(guild.iconURL())
            .setAuthor({
                name : owner.user.tag, 
                url : owner.user.displayAvatarURL()
            })
        , owner.user.tag, owner.user.displayAvatarURL());
    });
};
