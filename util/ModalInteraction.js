'use strict';
const Interaction = require( 'discord.js/src/structures/Interaction');
const InteractionWebhook = require('discord.js/src/structures/InteractionWebhook');
const InteractionResponses = require('discord.js/src/structures/interfaces/InteractionResponses');
class ModalInteraction extends Interaction {
	
	constructor(client, data) {
		super(client, data);
		this.commandId = data.data.custom_id;
		this.type = "MODAL_SUBMIT";
		this.targetType = "MODAL";
		this.deferred = false;
		this.replied = false;
		this.ephemeral = null;
		this.components = data.data.components?.map(({components}) =>components[0]);

		this.webhook = new InteractionWebhook(this.client, this.applicationId, this.token);
	}
}
InteractionResponses.applyToClass(ModalInteraction, ['deferUpdate', 'update']);

module.exports = ModalInteraction;