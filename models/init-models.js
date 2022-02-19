var DataTypes = require("sequelize").DataTypes;
var _code = require("./code");

function initModels(sequelize) {
  var code = _code(sequelize, DataTypes);


  return {
    code,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
