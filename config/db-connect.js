const mysql = require('mysql2');


const connection = mysql.createPool({
    user: "root",
    password: "",
    database: "billing_db",
    host: "localhost",
    port: 3306,
    connectTimeout: 10000 // Increase timeout to 10 seconds
});

connection.getConnection((err, connection) => {
  if (err) {
    console.log(err)
  }
  else if (connection) {
    console.log("connection successfull")
  }
})

module.exports = connection;
