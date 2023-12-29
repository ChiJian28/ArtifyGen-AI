const express = require('express');
const app = express();
const cors = require('cors');
const imageRoute = require('./routes/imageRoute.js');
const shareRoute = require('./routes/shareRoute.js');
require('dotenv').config();

const { sequelize, connectToDatabase } = require('./db/db'); 

app.use(express.json());
app.use(cors());


// test backend
app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("Testing Backend ...");
});

// routes
app.use('/images', imageRoute)
app.use('/share', shareRoute)


// start server
const server = async () => {
  try {
    await connectToDatabase();
    await sequelize.sync();
    console.log('Database synced successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server has started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

server();

