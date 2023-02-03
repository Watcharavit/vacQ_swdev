const express = require('express');
const dotenv = require('dotenv');
const app = express();
//Load env vars
dotenv.config({path:"./config/config.env"});

// route files
const hospitals = require('./routes/hospitals')

// mount routers
app.use('/api/v1/hospitals',hospitals)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('server running in', process.env.NODE_ENV,' mode on port ', PORT));
 