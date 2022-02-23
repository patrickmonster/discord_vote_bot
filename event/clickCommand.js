// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
module.exports = async function(interaction) {
	if (!interaction.isCommand()) return;
	const { client, commandName } = interaction; 

	const c = client.system_command.get(commandName);
	
	if (c) {
		c.execute(interaction, interaction.options.getSubcommand(false));
	}
	else {
		interaction.deferReply({ ephemeral: true });
	}
};
