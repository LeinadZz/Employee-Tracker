const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'Wdb7Gf2:HSPHt7m',
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
