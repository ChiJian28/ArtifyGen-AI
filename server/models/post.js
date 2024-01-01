const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // 假设你已经有了 Sequelize 实例

const Post = sequelize.define('Post', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
}, {
  tableName: 'post',
  timestamps: false
});

module.exports = Post;
