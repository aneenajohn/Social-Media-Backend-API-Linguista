const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const getUser = async (req,res) => {
    try{
        const {user} = req;
        const { password, updatedAt,createdAt, ...other } = user._doc;
        res.json({
            success: true,
            user:other
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false, 
            errorMessage: err.message,
        });
    }
}

const updateUserDetails = async (req,res) => {
    const {user} = req;
    const userFound = user;
    console.log({userFound});
    // user himself / admin can UPDATE
    if (userFound._id || userFound.isAdmin) {
        if (req.body.password) {
            try {
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
              return res.status(500).json({
                success: false, 
                errorMessage: err.message,
              });
            }
          }
          try { 
            const updateUser =  req.body;
            const user =  extend(userFound,updateUser);
            const updatedUser = await user.save();
            // console.log(updatedUser,user);
            res.status(200).json({
                success:true,
                message:"Your account details has been updated",
                user:updatedUser
            });
          } 
          catch (err) {
            return res.status(500).json({
                success: false, 
                errorMessage: err.message,
            });
          }
    }
    else {
        return res.status(403).json({
            success:false,
            message:"You can update only your account!"
        });
    }
}

const deleteUser = async (req,res) => {
    try{
        const {user} = req;
        if (user._id || user.isAdmin) {
            await user.remove();
            res.json({
                success: true,
                message:"User deleted successfully",
                deletedUser: user
            })
        }
    }
    catch (err) {
        res.json({
          success: false,
          errorMessage: err.message,
        });
    }
}

const followUser = async (req, res) => {
    const {user} = req
    const {userId} = req.body; //follower to be added to user(user in param) = current user
    // if both are not same users
    if (userId !== user._id) {
      try {
        const currentUser = await User.findById(userId);
        if (!user.followers.includes(userId)) {
          await user.updateOne({ $push: { followers: userId } });
          await currentUser.updateOne({ $push: { followings: user._id} }); 
          res.status(200).json({
              success:true,
              message:"user has been followed",
            //   followedUser:currentUser,
            //   followingUser:user
          });
        } else {
          res.status(403).json({
              success:false,
              message:"you allready follow this user"
          });
        }
      } catch (err) {
        res.status(500).json({
            success: false,
            errorMessage: err.message,
        });
      }
    } else {
      res.status(403).json({
          success: false,
          message:"you cant follow yourself"
      });
    }
  }


  const unfollowUser = async (req, res) => {
    const {user} = req
    const {userId} = req.body; //follower to be removed from user(user in param) = current user
    // if both are not same users
    if (userId !== user._id) {
      try {
        const currentUser = await User.findById(userId);
        if (user.followers.includes(userId)) {
          await user.updateOne({ $pull: { followers: userId } });
          await currentUser.updateOne({ $pull: { followings: user._id} }); 
          res.status(200).json({
              success:true,
              message:"user has been unfollowed",
            //   unfollowedUser:currentUser,
            //   unfollowingUser:user
          });
        } else {
          res.status(403).json({
              success:false,
              message:"you dont follow this user"
          });
        }
      } catch (err) {
        res.status(500).json({
            success: false,
            errorMessage: err.message,
        });
      }
    } else {
      res.status(403).json({
          success: false,
          message:"you cant unfollow yourself"
      });
    }
  }



module.exports = {updateUserDetails,deleteUser,getUser,followUser,unfollowUser}