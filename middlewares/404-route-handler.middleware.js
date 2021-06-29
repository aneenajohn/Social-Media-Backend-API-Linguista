const routeNotFound = (req,res) => {
    res.status(404).json({success:false,message:"404 Route not found on server, please check"})
  }
  
  module.exports = {routeNotFound};