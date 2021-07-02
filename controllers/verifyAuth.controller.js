const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getAllUsers = (req,res) => {
    res.send("user route");
}

const registerUser = async (req,res) => {  
    try{
       const {username,email,password} = req.body;
       console.log(req.body);
       let isUserExisting = await User.findOne({ email });
        if (isUserExisting) {
            return res
            .status(403)
            .json({ 
                success: false, 
                message: "You have already signed up! Please login"
                });
        }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = await new User({
           username,
           email,
           password:hashedPassword })
       await newUser.save();

       res.status(200).json({
           success:true,
           user:newUser
       })
   }
   catch(err){
       res.json({
           success:false,
           errorMessage:err.message
       })
   }  
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ 
            success: false, 
            message: "Please signup! Given user details doesnt exist" });
      }
      const validatePassword = await bcrypt.compare(password, user.password);
      if(!validatePassword){
        return res.status(401).json({
          success: false,
          message: "Wrong credentials, Please check and try again.",
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          expiry: "24h",
        },
        process.env.secret
      );
      res
        .status(201)
        .json({ 
          success: true, 
          token, 
          message:"Successfully LoggedIn" ,
          user
        });
    } catch (err) {
      res.json({
        success: false,
        message: "Login failed",
        errorMessage: err.message
      })
    }
  };

module.exports= {getAllUsers,registerUser,loginUser}