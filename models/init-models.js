var DataTypes = require("sequelize").DataTypes;
var _code = require("./code");
var _guild = require("./guild");

function initModels(sequelize) {
  var code = _code(sequelize, DataTypes);
  var guild = _guild(sequelize, DataTypes);


  return {
    code,
    guild,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
