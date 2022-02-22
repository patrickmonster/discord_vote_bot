'use strict';

const BaseCommandInteraction = require('discord.js/src/structures/BaseCommandInteraction');
const CommandInteractionOptionResolver = require('discord.js/src/structures/CommandInteractionOptionResolver');


/*
{
  version: 1,
  type: 5,
  token: 'aW50ZXJhY3Rpb246OTQ1NjIzMzIxMzIyNjA2NjE0OmtDQjJ6N3VjcVllNkNzZ1cyRHhxWkFaR1BMSlhBTUtBeDc2SkY1eHRLRUpqZzRKSzVwRFRhRUViaVZ5dGZoQVVYb0dEM1hGbTducGtGakMxbmdPOWdnMHZmM0FLYjR0OGJGMDhpeEdpVkZTTHBKa2hNcUluZHo3Nkg5V3dBdTdo',
  member: {
    user: {
      username: '테스트',
      public_flags: 0,
      id: '836072783280209961',
      discriminator: '1121',
      avatar: '4c2b34b424d07b6fb5a050f4126635c9'
    },
    roles: [],
    premium_since: null,
    permissions: '2199023255551',
    pending: false,
    nick: null,
    mute: false,
    joined_at: '2021-09-17T03:50:44.583000+00:00',
    is_pending: false,
    deaf: false,
    communication_disabled_until: null,
    avatar: null
  },
  locale: 'ko',
  id: '945623321322606614',
  guild_locale: 'en-US',
  guild_id: '888270726891712563',
  data: {
    custom_id: 'vote create',
    components: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  channel_id: '944875153119137792',
  application_id: '944492162043764746'
}
*/

class ModalInteraction extends BaseCommandInteraction {
    constructor(client, data) {
        super(client, data);
    
        /**
         * The options passed to the command.
         * @type {CommandInteractionOptionResolver}
         */
        this.options = new CommandInteractionOptionResolver(
        this.client,
        data.data.options?.map(option => this.transformOption(option, data.data.resolved)) ?? [],
        this.transformResolved(data.data.resolved ?? {}),
        );
    }
    
    /**
     * Returns a string representation of the command interaction.
     * This can then be copied by a user and executed again in a new command while keeping the option order.
     * @returns {string}
     */
    toString() {
        const properties = [
        this.commandName,
        this.options._group,
        this.options._subcommand,
        ...this.options._hoistedOptions.map(o => `${o.name}:${o.value}`),
        ];
        return `/${properties.filter(Boolean).join(' ')}`;
    }
}