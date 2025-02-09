const userModel = require('../models/user.models');
const captionModel = require('../models/caption.model')
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklist.token');


module.exports.authUser = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   if (!token) {
      return res.status(401).json({ message: "token not provided" })
   }

   const isBlacklisted = await BlacklistToken .findOne({ token: token });
   if (isBlacklisted) {
      return res.status(401).json({ message: "token is blacklisted" })
   }

   try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userModel.findById(decode._id);

      req.user = user;
      return next();
   } catch (error) {
    return res.status(402).json({ message: error.message })  
   }
}

module.exports.authCaption = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   if (!token) {
      return res.status(401).json({ message: "token not provided" })
   }

   const isBlacklisted = await BlacklistToken.findOne({ token: token });
   if (isBlacklisted) {
      return res.status(401).json({ message: "token is blacklisted" })
   } 

   try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const captain = await captionModel.findById(decode._id);

      req.caption = captain;

      // this line is important if it not written then it not pass next to routers.  
      return next();
   } catch (error) {
    return res.status(402).json({ message: error.message })  
   }
}











// IN THIS MIDDLEWARE WE ARE VERIFYING THE USER TOKEN AND IF THE TOKEN IS VALID THEN WE ARE FINDING THE USER BY ID AND ADDING THE USER TO THE REQUEST OBJECT AND CALLING THE NEXT FUNCTION
// IF THE TOKEN IS NOT VALID THEN WE ARE SENDING THE RESPONSE WITH STATUS 401 AND MESSAGE "UNAUTHORIZED"
// WE ARE EXPORTING THIS FUNCTION SO THAT WE CAN USE IT IN OUR ROUTES
// WE ARE USING ASYNC AWAIT TO MAKE THE FUNCTION ASYNC
// WE ARE USING JWT TO VERIFY THE TOKEN
// WE ARE USING REQ.COOKIES TO GET THE TOKEN FROM THE COOKIES
// WE ARE USING TRY CATCH BLOCK TO HANDLE THE ERROR
// WE ARE EXPORTING THIS FUNCTION SO THAT WE CAN USE IT IN OUR ROUTES
// WE ARE USING ASYNC AWAIT TO MAKE THE FUNCTION ASYNC