const { guild : t_guild } = require('#models');

const getMessage = require('#util/getMessage'); // 커맨드 관리자

// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = function(guild) {
    const { client } = guild;
    t_guild.update({ 
        id : guild.id,
        left_at : new Date()
    }).catch(_=>{});
    
	client._webhooks.send('guild', {
        content : 'Delete Guild',
        embeds : [
                getMessage({ 
                title: `${guild.name}`,
                content: `${guild.name}(${guild.id})`,
            }).setColor('#ff0000').setThumbnail(guild.iconURL())
        ],
    });
};
