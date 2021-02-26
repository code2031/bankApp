const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST_NAME,
  dialect: 'mysql',
  operatorAliases: false
});

// Verify the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
global.sequelize = sequelize;
