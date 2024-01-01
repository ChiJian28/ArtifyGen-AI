require('dotenv').config();

const { Sequelize } = require('sequelize');

// // connect to local db
// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   dialectOptions: {
//     ssl: false,
//   },
// });

// connect to vercel db (cloud)
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectModule: pg, // 添加这一行
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false, // 忽略 SSL 证书验证（请注意潜在的安全风险）
      },
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