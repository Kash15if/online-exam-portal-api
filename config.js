require("dotenv").config();

const dbConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORTDB,
  database: process.env.DATABASENAME,
};

module.exports = dbConfig;
