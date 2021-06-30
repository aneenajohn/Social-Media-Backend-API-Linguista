const express = require("express");
const userRouter = express.Router();
const {userParamHandler} = require ("../controllers/params.controller");
const {updateUserDetails} = require("../controllers/user.controller");

userRouter.route("userId",userParamHandler);

userRouter.route("/:userId")
    .post(updateUserDetails);


// userRouter.route('/')
//     .get(getAllUsers);

module.exports = { userRouter } ;