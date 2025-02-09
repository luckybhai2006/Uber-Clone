const captionModel = require("../models/caption.model")
const captionService = require("../services/caption.service")
const { validationResult } = require('express-validator');
// const blacklistTokenSchema = require('../models/blacklist.token')
module.exports.registerCaption = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   // console.log(req.body)

   const { fullname, email, password, vehicle } = req.body;

   const captionAlredyExists = await captionModel.findOne({ email })
   if (captionAlredyExists) {
      return res.status(400).json({ message: "Caption alredy exists" })
   }

   const hashedPassword = await captionModel.hashPassword(password);
   const captain = await captionService.createCaption({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
   })
   const token = captain.generateAuthToken();
   res.status(201).json({ token, captain })
};


module.exports.loginCaption = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   };
   const { email, password } = req.body;
   const caption = await captionModel.findOne({ email }).select('+password');

   if (!caption) {
      return res.status(401).json({})
   };
   const isMatch = await caption.comparePassword(password);

   if (!isMatch) {
      return res.status(401).json({ message: "Envalid Email or Password" })
   }
   const token = caption.generateAuthToken();
   res.cookie('token', token);
   res.status(200).json({ token, caption })
};

module.exports.getCaptionProfile = async (req, res) => {
   res.status(200).json(req.caption)
};

// module.exports.logoutCaption = async(req, res) => {
//    res.clearCookie('token');
//    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
//    await blacklistTokenSchema.create({ token })
//    res.status(200).json({ message: "Logout Successfully" }) 
// }