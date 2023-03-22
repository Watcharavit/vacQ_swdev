const mysql = require("mysql")

var connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "2412",
	database: "vacCenter"
})

module.exports = connection
