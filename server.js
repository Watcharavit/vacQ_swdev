const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

// route files
const appointments = require("./routes/appointments");
const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express VacQ API"
		},
		servers: [
			{
				url: "http://localhost:5000/api/v1"
			}
		]
	},
	apis: ["./routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// body parser
app.use(cors());
// cookie parser
app.use(cookieParser());
// parse(transform) JSON data to JavaScript
app.use(express.json());
// Sanitize data, should be done after parsing
app.use(mongoSanitize());
// Set security header
app.use(helmet());
// prevent xss(cross site scripting) attacks
app.use(xss());
// rate limit
const limiter = rateLimit({
	windowsMs: 10 * 60 * 1000, //10 mins
	max: 10 // amount
});
app.use(limiter);
//Prevent http param pollutions
app.use(hpp());

app.use("/api/v1/appointments", appointments);
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("server running in", process.env.NODE_ENV, " mode on port ", PORT));

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	//close server &exit process
	server.close(() => process.exit(1));
});
