const mysql = require("mysql");

const pool = mysql.createPool({
host: "localhost",
user: "root",
//   password: "password",
database: "just-order",
});

module.exports = pool;

// host: "localhost",
// user: "root",
// //   password: "password",
// database: "just-order",

// host: "sql6.freemysqlhosting.net",
// user: "sql6441797",
// password: "9m2SNrVi8F",
// database: "sql6441797",