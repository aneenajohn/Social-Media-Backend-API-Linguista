const express = require("express");
const userRouter = express.Router();
const {userParamHandler} = require ("../controllers/params.controller");
const {updateUserDetails} = require("../controllers/user.controller");

userRouter.param("userId",userParamHandler);

userRouter.route("/:userId")
    .post(updateUserDetails);

module.exports = { userRouter } ;