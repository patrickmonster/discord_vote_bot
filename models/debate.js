const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('debate', {
    topic: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "주제"
    },
    owner: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    channel: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "스레드(진행중인)"
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "시작시간"
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "종료시간"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "진행중인길드",
      references: {
        model: 'user',
        key: 'guild'
      }
    },
    event: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "이벤트 ID"
    }
  }, {
    sequelize,
    tableName: 'debate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "channel" },
        ]
      },
      {
        name: "debate_owner_IDX",
        using: "BTREE",
        fields: [
          { name: "owner" },
        ]
      },
      {
        name: "debate_FK",
        using: "BTREE",
        fields: [
          { name: "guild" },
          { name: "owner" },
        ]
      },
    ]
  });
};
