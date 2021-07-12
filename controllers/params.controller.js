const User = require("../models/user.model");
const Post = require("../models/post.model");

const userParamHandler = async (req, res, next, userId) => {
    try {
      console.log({userId}) 
      const user = await User.findById(userId)
    //   console.log({user});
      if(!user){
        return res.status(404).json({ sucess: false, message: "There is no user associated with the id provided" })
      } 
      req.user = user;
      next();
    }catch(err){
        return res.json({ 
            success: false, 
            errorMessage: err.message
        });
    }
}

const postParamHandler = async (req,res,next,postId) => {
    try{
        const post = await Post.findById(postId)
        if(!post){
            return res
                    .status(404)
                    .json({ 
                        sucess: false, 
                        message: "There is no post associated with the id provided"
                    })
        } 
        req.post = post;
        next();
    }catch(err){
        return res.json({ 
            success: false, 
            errorMessage: err.message
        });
    }
}
module.exports ={userParamHandler,postParamHandler}