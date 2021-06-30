const express = require("express");
const verifyAuth = express.Router();
const User = require("../models/user.model");
const {registerUser,loginUser} = require("../controllers/verifyAuth.controller");

verifyAuth.post("/register",registerUser);
verifyAuth.post("/login",loginUser);

module.exports = { verifyAuth } ;