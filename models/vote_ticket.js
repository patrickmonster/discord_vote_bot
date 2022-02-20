const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote_ticket', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "투표 id",
      references: {
        model: 'vote',
        key: 'idx'
      }
    },
    user: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "투표자",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    select: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0",
      comment: "선택항목\r\n0\r\n1\r\n2\r\n3\r\n(4지선다)"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "길드",
      references: {
        model: 'user',
        key: 'guild'
      }
    },
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'vote_ticket',
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
        name: "vote_ticket_user_IDX",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "vote_ticket_FK_1",
        using: "BTREE",
        fields: [
          { name: "guild" },
          { name: "user" },
        ]
      },
      {
        name: "vote_ticket_id_IDX",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
