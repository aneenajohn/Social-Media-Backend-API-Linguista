const express = require("express");
const userRouter = express.Router();
const {userParamHandler} = require ("../controllers/params.controller");
const {getUser,updateUserDetails,deleteUser,followUser,unfollowUser} = require("../controllers/user.controller");

userRouter.param("userId",userParamHandler);

userRouter.route("/:userId")
    .get(getUser)
    .post(updateUserDetails)
    .delete(deleteUser);

userRouter.route("/:userId/follow")
    .post(followUser)

userRouter.route("/:userId/unfollow")
    .post(unfollowUser)

module.exports = { userRouter } ;