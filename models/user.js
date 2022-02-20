const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "사용자id"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "길드 ID"
    },
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "인덱싱"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "user_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guild" },
          { name: "id" },
        ]
      },
      {
        name: "user_id_IDX",
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "guild" },
        ]
      },
    ]
  });
};
