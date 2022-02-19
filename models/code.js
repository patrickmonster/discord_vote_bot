const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('code', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    explanation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "설명"
    },
    arg0: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "파람"
    },
    arg1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "파람"
    },
    arg2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "파람"
    },
    arg3: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "파람"
    },
    type: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "0",
      comment: "코드타입"
    }
  }, {
    sequelize,
    tableName: 'code',
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
    ]
  });
};
