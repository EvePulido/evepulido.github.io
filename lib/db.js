// lib/db.js
const { createPool } = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
  host: process.env.MYSQLDB_HOST,  
  user: process.env.MYSQLDB_USER,        
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQL_DATABASE,  
  port: Number(process.env.MYSQL_DOCKER_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;