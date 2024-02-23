const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

db = mysql.createConnection({
	host: "nw-1.cjirsvcriwkc.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "NWarehouse2020",
	database: "NW-3",
	port:3306,
});

// make server object that contain port property and the value for our server.
var server = {
	host:"0.0.0.0",
	port: 4041
};

// use the modules
const usersRouter = require("./routes/users");
// use the modules
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
// use router
app.use("/users", usersRouter);

// starting the server
app.listen(server.port, () =>
	console.log(`Server started, listening port: ${server.port}`)
);