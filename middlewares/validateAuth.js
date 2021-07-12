const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const validateAuth = async (req, res, next) => {
  
    try {
      const token = req.headers.authorization;
      if(!token){
        return res
                  .status(401)
                  .json({
                     success: false,
                     message: "Please login to access",
                  })
      }
      const decoded = jwt.verify(token, process.env.secret);
      const {userId} = decoded;
      // req.userId = decoded.userId;
      const user = await User.findById(userId)
          .select("-password -__v")
        
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User Doesnt exist",
        });
      }
      req.user = user;
      next();
    } catch (err) {
      res
      .status(401)
      .json({ 
        success: false,
        message: "User not Authorized",
        errorMessage:err.message  
        });
    }
  };
  
  module.exports = { validateAuth };