const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  //   password: "password",
  database: "just-order",
});

module.exports = pool;