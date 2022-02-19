
const { Q } = require('#models');

// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = function(guild) {
    Q("INSERT",`
SET @id = ?, @name = ?, @icon = ?, @menber_count = ?, @ownerId = ?; 
INSERT INTO guild(id, name, icon, menber_count, ownerId) 
VALUES( @id, @name, @icon, @menber_count, @ownerId )
ON DUPLICATE KEY UPDATE name = @name, icon = @icon, join_at = now(), menber_count = @menber_count, ownerId = @ownerId
    `, guild.id, guild.name, guild.icon, guild.memberCount, guild.ownerId
    ).catch(e=>{
        console.log(e);
    });
};
