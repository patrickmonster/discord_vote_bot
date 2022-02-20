const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "사용자 ID"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "MW",
      comment: "액션타입"
    },
    target: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "상황에 맞게 사용"
    }
  }, {
    sequelize,
    tableName: 'activity',
    timestamps: false,
    indexes: [
      {
        name: "activity_id_IDX",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "activity_guild_IDX",
        using: "BTREE",
        fields: [
          { name: "guild" },
        ]
      },
      {
        name: "activity_target_IDX",
        using: "BTREE",
        fields: [
          { name: "target" },
        ]
      },
      {
        name: "activity_type_IDX",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
};
