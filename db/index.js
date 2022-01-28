
const { Pool } = require("pg");

const pool = new Pool({
  database: "servo_app_db",
});

module.exports = pool