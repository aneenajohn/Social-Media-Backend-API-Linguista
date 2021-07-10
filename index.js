const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');

const {initializeDBConnection} = require("./db/db.js");

const {userRouter} = require("./routes/user.routes");
const {postRouter} = require("./routes/post.routes");

const{verifyAuth} = require("./routes/verifyAuth");
const {validateAuth} = require("./middlewares/validateAuth");
const {errorHandler }  = require("./middlewares/error-handler.middleware.js");
const {routeNotFound} = require("./middlewares/404-route-handler.middleware.js");

dotenv.config();
const app = express();
const PORT= 8005;
app.use(cors());
app.use(express.json());

initializeDBConnection();

app.use(helmet());
app.use(morgan("common"));


app.get('/',(req,res)=> {
    res.json({api:"This is an API for linguista social media app"});
})

app.use('/auth',verifyAuth);
app.use('/users',validateAuth,userRouter);
app.use('/post',validateAuth,postRouter);

// ERROR HANDLER & 404s This should be the last route,Keep it here dont move
app.use(errorHandler);
app.use(routeNotFound);

app.listen( process.env.PORT, () => {
    console.log(`Server started at port: ${PORT} !!`);
  });