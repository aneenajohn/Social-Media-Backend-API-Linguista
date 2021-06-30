const User = require("../models/user.model");

const userParamHandler = async (req, res, next, userId) => {
    try {
      console.log({userId}) 
      const user = User.findById(userId)
      console.log({user});
      req.user = user;
      next();
    }catch(err){
        res.json({ 
            success: false, 
            errorMessage: err.message
        });
    }
}

module.exports ={userParamHandler}