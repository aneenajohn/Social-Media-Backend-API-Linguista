const User = require("../models/user.model");

const userParamHandler = async (req, res, next, userId) => {
    try {
      console.log({userId}) 
      const user = await User.findById(userId)
    //   console.log({user});
      if(!user){
        return res.status(404).json({ sucess: false, message: "There is no video associated with the id provided" })
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

module.exports ={userParamHandler}