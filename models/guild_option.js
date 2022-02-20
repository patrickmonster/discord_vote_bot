const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guild_option', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "길드 ID"
    }
  }, {
    sequelize,
    tableName: 'guild_option',
    timestamps: false
  });
};
