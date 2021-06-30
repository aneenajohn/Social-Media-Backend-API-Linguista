const { extend } = require("lodash");
const bcrypt = require("bcrypt");

const updateUserDetails = async (req,res) => {
    const {user} = req;
    const userFound = user;
    console.log({userFound});

    if (!userFound.isAdmin) {
        if (req.body.password) {
            try {
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
              return res.status(500).json(err);
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

module.exports = {updateUserDetails}