var DataTypes = require("sequelize").DataTypes;
var _activity = require("./activity");
var _code = require("./code");
var _debate = require("./debate");
var _debate_message = require("./debate_message");
var _guild = require("./guild");
var _guild_option = require("./guild_option");
var _user = require("./user");
var _vote = require("./vote");
var _vote_ticket = require("./vote_ticket");

function initModels(sequelize) {
  var activity = _activity(sequelize, DataTypes);
  var code = _code(sequelize, DataTypes);
  var debate = _debate(sequelize, DataTypes);
  var debate_message = _debate_message(sequelize, DataTypes);
  var guild = _guild(sequelize, DataTypes);
  var guild_option = _guild_option(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var vote = _vote(sequelize, DataTypes);
  var vote_ticket = _vote_ticket(sequelize, DataTypes);

  debate.belongsTo(user, { as: "owner_user", foreignKey: "owner"});
  user.hasMany(debate, { as: "debates", foreignKey: "owner"});
  debate.belongsTo(user, { as: "guild_user", foreignKey: "guild"});
  user.hasMany(debate, { as: "guild_debates", foreignKey: "guild"});
  vote.belongsTo(user, { as: "owner_user", foreignKey: "owner"});
  user.hasMany(vote, { as: "votes", foreignKey: "owner"});
  vote.belongsTo(user, { as: "guild", foreignKey: "guild_id"});
  user.hasMany(vote, { as: "guild_votes", foreignKey: "guild_id"});
  vote_ticket.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(vote_ticket, { as: "vote_tickets", foreignKey: "user"});
  vote_ticket.belongsTo(user, { as: "guild_user", foreignKey: "guild"});
  user.hasMany(vote_ticket, { as: "guild_vote_tickets", foreignKey: "guild"});
  vote_ticket.belongsTo(vote, { as: "id_vote", foreignKey: "id"});
  vote.hasMany(vote_ticket, { as: "vote_tickets", foreignKey: "id"});

  return {
    activity,
    code,
    debate,
    debate_message,
    guild,
    guild_option,
    user,
    vote,
    vote_ticket,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
