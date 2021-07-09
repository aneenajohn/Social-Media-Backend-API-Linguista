const express = require("express");
const postRouter = express.Router();
const {createPost,updatePost,deletePost,likeDislikePost,getPost,getAllTimelinePost}= require("../controllers/post.controller");
const {postParamHandler} = require("../controllers/params.controller");


postRouter.route("/")
    .post(createPost)

postRouter.route("/timeline")
    .post(getAllTimelinePost)

postRouter.param("postId",postParamHandler);

postRouter.route("/:postId")
    .get(getPost)
    .post(updatePost)
    .delete(deletePost)

postRouter.route("/:postId/like")
    .post(likeDislikePost)

module.exports ={postRouter}