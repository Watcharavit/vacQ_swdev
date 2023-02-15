const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

// route files
const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");
const app = express();

// body parser
app.use(express.json());
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);

// cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		"server running in",
		process.env.NODE_ENV,
		" mode on port ",
		PORT
	)
);

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	//close server &exit process
	server.close(() => process.exit(1));
});
