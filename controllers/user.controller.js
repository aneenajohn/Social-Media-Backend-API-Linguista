
const updateUserDetails = async (req,res) => {
    const {user} = req;
    try{
        res.json({
            success:true,
            user
        })
    }
    catch(err){
        res.json({ 
            success: false, 
            errorMessage: err.message
        });
    }
}

module.exports = {updateUserDetails}