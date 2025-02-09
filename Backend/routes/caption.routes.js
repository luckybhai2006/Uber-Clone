const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const captionController = require('../controllers/caption.controller')
const authMiddleware = require('../middlewares/auth.middleware') 

router.post('/register',[
   body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be atleast 3 characters long'),
   body('email').isEmail().withMessage('Email is required'),
   body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
   body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 character long'),
   body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 character long'),
   body('vehicle.capacity').isInt({min:1}).withMessage('Capicity must be at least 1'),
   body('vehicle.vehicleType').isIn(['car','moto','auto']).withMessage('invalid vehicle type')
],
captionController.registerCaption)


router.post('/login',[
   body('email').isEmail().withMessage('Email is required'),
   body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
],
captionController.loginCaption)

router.get('/profile',authMiddleware.authCaption, captionController.getCaptionProfile);

// router.get('/logout', authMiddleware.authCaption, captionController.logoutCaption);


module.exports = router  