// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = async function(interaction, msg) {
	const { client, guild, commandName, channelId, member, user  } = interaction;
	const c = client.system_app.get(commandName);
	if (c) {
        c.execute(interaction, msg);
	} else {
		interaction.deferReply({ ephemeral: true });
	}
};
