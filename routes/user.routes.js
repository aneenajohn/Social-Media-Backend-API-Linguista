const express = require("express");
const userRouter = express.Router();
const {getAllUsers} = require('../controllers/user.controller');

userRouter.route('/')
    .get(getAllUsers);

module.exports = { userRouter } ;