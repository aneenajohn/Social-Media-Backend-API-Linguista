const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const db_url = process.env.URL;

async function initializeDBConnection() {
  try{
      await mongoose.connect(db_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
      })
      console.log("CONNECTION SUCCESSFUL")
  }
  catch(error){
    console.error(error);
    console.log("mongoose connection failed");
  }
}

module.exports= {initializeDBConnection};
