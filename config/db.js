const mongoose = require('mongoose');

// const dotenv = require("dotenv");
// //Load env vars
// dotenv.config({path:"./config/config.env"});

const connectDB = async()=>{
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect("mongodb+srv://earn:swdev@vaqqcluster.qzpjdot.mongodb.net/?retryWrites=true&w=majority");
    // const conn = await mongoose.connect(process.env.MONGO_URI,{
    //     userNewUrlParser:true,
    //     useUnifiedTopology:true,
    // });
    console.log(`mongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;