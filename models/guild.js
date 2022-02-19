const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guild', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "길드 이름"
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "아이콘"
    },
    join_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "입장시간"
    },
    member_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "회원수"
    },
    ownerId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "소유자  id"
    },
    left_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guild',
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
    ]
  });
};
