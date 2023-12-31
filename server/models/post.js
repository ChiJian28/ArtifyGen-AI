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
    type: DataTypes.ARRAY(DataTypes.STRING), // 修改数据类型为字符串数组
    allowNull: true,
  },
}, {
  tableName: 'user_post',
  timestamps: false
});

module.exports = Post;
