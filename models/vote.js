const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "제목"
    },
    owner: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "생성자",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성시각"
    },
    guild_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "진행길드",
      references: {
        model: 'user',
        key: 'guild'
      }
    },
    arg0: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "T",
      comment: "선택지"
    },
    arg1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "F",
      comment: "선택지"
    },
    arg2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "선택지"
    },
    arg3: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "선택지"
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "기간 or 종료시간"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "설명"
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "최소 투표인원 - 0일경우 제한 없음"
    }
  }, {
    sequelize,
    tableName: 'vote',
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
        name: "vote_guild_id_IDX",
        using: "BTREE",
        fields: [
          { name: "guild_id" },
        ]
      },
      {
        name: "vote_FK_1",
        using: "BTREE",
        fields: [
          { name: "guild_id" },
          { name: "owner" },
        ]
      },
    ]
  });
};
