const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/create',
   authMiddleware.authUser,
   body('pickup').isString().isLength({min:3}).withMessage('Pickup location is required'),
   body('destination').isString().isLength({min:3}).withMessage('Destination location is required'),
   body('vehicleType').isIn(['auto','car','moto']).withMessage('Invalid vehicle type'),
   rideController.createRide
)
router.get('/get-fare',
   authMiddleware.authUser,
   query('pickup').isString().isLength({min:3}).withMessage('Pickup location is required'),
   query('destination').isString().notEmpty().withMessage('Destination is required'),
   rideController.getFare
)
router.post('/confirm',
   authMiddleware.authCaption,
   body('rideId').isMongoId().withMessage('Invalid ride id'),
   rideController.confirmRide
)
router.get('/start-ride',
   authMiddleware.authCaption,
   query('rideId').isMongoId().withMessage('Invalid ride id'),
   query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid OTP'),
   rideController.startRide
)
router.post('/finish-ride',
   authMiddleware.authCaption,
   body('rideId').isMongoId().withMessage('Invalid ride id'),
   rideController.finishRide
)
module.exports = router;