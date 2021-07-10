const Post = require("../models/post.model");
const User = require("../models/user.model");
const { extend } = require("lodash");

const createPost = async (req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            success:true,
            savedPost
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            errorMessage: err.message,
        });
    }
}

const updatePost = async(req,res) => {
    try{
        const { post } = req;
        const postFound = post;
        const { userId } = req.body; 
        // console.log({postFound});
        // console.log("postFound.userId",postFound.userId);
        // console.log("userId",userId);
        if (postFound.userId === userId) {
            const updatePost = req.body;
            const post = extend(postFound,updatePost);
            const updatedPost = await post.save();
            // console.log({updatedPost});
            return res.status(200).json({
                success:true,
                message:"Post updated succesfully",
                post:updatedPost
            })
        }
        return res.status(403).json({
                    success:false,
                    errorMessage:"you dont have access to update others post"
                });
    }
    catch(err){
        res.json({
            success: false, 
            msg:"inga dha",
            errorMessage: err.message,
        })
    }
}


const deletePost = async (req,res) => {
    try{
        const {post} = req;
        const {userId} = req.body;
        if (post.userId === userId) {
           await post.remove();
           return res.json({
               success:true,
               message:"Post removed successfully",
               deletedPost: post
           }) 
        }
        return res.status(403).json({
            success:false,
            errorMessage:"you dont have access to delete others post"
        });
    }catch (err) {
        res.json({
          success: false,
          errorMessage: err.message,
        });
    }
}

const likeDislikePost = async (req,res) => {

    try{
        const {post} = req;
        const {userId,reaction} = req.body;
        const userReacted = post.reactions[reaction].includes(userId);

        let updatedPostReaction;

        if (userReacted) {
            switch (reaction) {
              case "thumbsUp":
               updatedPostReaction = await Post.updateOne(
                  { _id: post._id },
                  { $pull: { "reactions.thumbsUp": userId } }
                );
                break;
      
              case "hooray":
                updatedPostReaction = await Post.updateOne(
                  { _id: post._id },
                  { $pull: { "reactions.hooray": userId } }
                );
                break;

              case "heart":
                updatedPostReaction = await Post.updateOne(
                      { _id: post._id },
                      { $pull: { "reactions.heart": userId } }
                    );
                    break;
            
              case "rocket":
                updatedPostReaction = await Post.updateOne(
                  { _id: post._id },
                  { $pull: { "reactions.rocket": userId } }
                );
                break;

              case "eyes":
                updatedPostReaction =   await Post.updateOne(
                        { _id: post._id },
                        { $pull: { "reactions.eyes": userId } }
                    );
                    break;
            }
        }
        else {
            switch (reaction) {
              case "thumbsUp":
                updatedPostReaction = await Post.updateOne(
                  { _id: post._id },
                  { $push: { "reactions.thumbsUp": userId } }
                );
                break;
      
              case "hooray":
                updatedPostReaction = await Post.updateOne(
                  { _id: post._id },
                  { $push: { "reactions.hooray": userId } }
                );
                break;

              case "heart":
                 updatedPostReaction =   await Post.updateOne(
                      { _id: post._id },
                      { $push: { "reactions.heart": userId } }
                    );
                    break;

              case "rocket":
                 updatedPostReaction = await Post.updateOne(
                    { _id: post._id },
                    { $push: { "reactions.rocket": userId } }
                );
                break;

              case "eyes":
                 updatedPostReaction = await Post.updateOne(
                    { _id: post._id },
                    { $push: { "reactions.eyes": userId } }
                );
                break;
            }
        }
        res.json({ 
            success:true,
            message: "You reacted to the post",
         });
    }
    catch (err) {
        res.status(500).json({
          success: false,
          errorMessage: err.message,
        });
    }
}

const getPost = async (req,res) => {
    try{
        const {post} = req;
        res.status(200).json({
            success:true,
            post
        });
    }catch (err) {
        res.status(500).json({
          success: false,
          errorMessage: err.message,
        });
    }
}

const getAllTimelinePost = async (req, res) => {
    try {
      const {userId} = req.body;
      const currentUser = await User.findById(userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      const timeline = userPosts.concat(...friendPosts);
      res.json({
          success:true,
          timeline
      })
    } catch (err) {
        res.status(500).json({
            success: false, 
            errorMessage: err.message,
        });
    }
}

module.exports={createPost,updatePost,deletePost,likeDislikePost,getPost,getAllTimelinePost}