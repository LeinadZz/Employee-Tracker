const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_PASSWORD,
  password: process.env.DB_PASSWORD,
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
