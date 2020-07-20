import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// Create connection
 const db = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Connect
db.connect((err) => {
  if (err) throw(err)
  console.log('Mysql connected ...')
});
export default db;