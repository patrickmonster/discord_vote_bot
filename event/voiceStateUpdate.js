const createActivity = require("#util/createActivity");
/**
 * https://discord.js.org/#/docs/discord.js/stable/class/VoiceState
 * @param {*} oldState 
 * @param {*} newState 
 */
module.exports = function(oldState, newState) {
    createActivity(
        oldState.channelId || newState.channelId,
        oldState.guildId,
        oldState.id,
        oldState.channelId ? "VL" : "VJ"
    );
};
