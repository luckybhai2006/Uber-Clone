const userModel = require('../models/user.models')
const userServices = require('../services/user.services')
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../models/blacklist.token')
// ================================REGISTER USER==================================

module.exports.registerUser = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // console.log(errors.array())
      return res.status(400).json({ errors: errors.array() })
   }

   // console.log(req.body)

   const { fullname, email, password } = req.body;
const userAlredyExists = await userModel.findOne({email})
if(userAlredyExists){
   return res.status(400).json({message:"user alredy exists"})
}

   const hashedPassword = await userModel.hashPassword(password);
   const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
   })
   const token = user.generateAuthToken();
   res.status(201).json({ token, user })
};

// =================================LOGIN USER====================================

module.exports.loginUser = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   } 
   
   const { email, password } = req.body;
   const user = await userModel.findOne({ email }).select('+password');

   if (!user) {
      return res.status(401).json({ message: "envalid Email or Password" })
   };
   const isMatch = await user.comparePassword(password);

   if (!isMatch) {
      return res.status(401).json({ message: "envalid Email or Password" })
   }
   

   const token = user.generateAuthToken();
   res.cookie('token', token);
   res.status(201).json({ token, user })
};

// =================================PROFILE USER==================================

module.exports.getUserProfile = async (req, res) => {
   res.status(200).json(req.user)
}

// =================================LOGOUT USER===================================

// module.exports.logoutUser = async(req, res) => {
//    res.clearCookie('token');
//    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
//    await blacklistTokenSchema.create({ token })
//    res.status(200).json({ message: "Logout Successfully" }) 
// }