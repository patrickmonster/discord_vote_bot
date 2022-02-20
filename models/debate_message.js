const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('debate_message', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "메세지 id"
    },
    channel: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "채널(스레드 ID)"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "길드 ID"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    owner_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "메세지 소유자"
    }
  }, {
    sequelize,
    tableName: 'debate_message',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "debate_message_guild_IDX",
        using: "BTREE",
        fields: [
          { name: "guild" },
        ]
      },
      {
        name: "debate_message_channel_IDX",
        using: "BTREE",
        fields: [
          { name: "channel" },
        ]
      },
    ]
  });
};
