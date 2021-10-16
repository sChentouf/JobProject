const mysql = require("mysql");
const dbConfig = require("../db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  password: dbConfig.password,
  database: dbConfig.database,
  user: dbConfig.user,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

//exemple de route GET pr test
//app.get("/route/1", (_, res) => {
// res.send({
//   msg: "fddfgdgf",
//  });
//});

// insert
//let sql = `INSERT INTO test(couleur,langue)
//VALUES('GRIS','allemand')`;
// execute the insert
//connection.query(sql);

//connection.end();
//module.exports = connection;
