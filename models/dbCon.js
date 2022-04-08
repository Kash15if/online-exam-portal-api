const { Pool } = require("pg");

const dbConfig = require("../config");

// new pool creation using environment variable
const pool = new Pool(dbConfig);

module.exports = pool;
