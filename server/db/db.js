require('dotenv').config();

const { Sequelize } = require('sequelize');

// init our database
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialectOptions: {
    ssl: false,
  },
});


// Sequelize 会在需要时自动连接到数据库，所以这个connectToDatabase没有也是可以的
// 但是我们可以test connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = {
  sequelize,
  connectToDatabase
};