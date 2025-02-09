const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const { pickup, destination, distance, vehicleType } = req.body;
 
    try {
        // Fetch pickup coordinates
        const pickupCoordinates = await mapsService.getAdressCoordinates(pickup);
 
        // Ensure pickup coordinates are valid
        if (!pickupCoordinates || !pickupCoordinates.lat || !pickupCoordinates.lng) {
            return res.status(400).json({ error: 'Invalid pickup location coordinates' });
        }
 
        // Get captains in the 2 km radius of the pickup coordinates
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(
            pickupCoordinates.lat,
            pickupCoordinates.lng,
            5 // 2 km radius
        );
 
        // If no captains found, return a response
        if (captainsInRadius.length === 0) {
            return res.status(404).json({ message: 'No captains available in this area' });
        }
 
        // Create the ride
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, distance, vehicleType });
        
        // Populate user info for the ride
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
 
        // Send ride details to available captains
        captainsInRadius.forEach((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });
 
        // Send response after completing all operations
        res.status(201).json({ ride });
 
    } catch (err) {
        console.error(err);
        if (!res.headersSent) { // Prevent sending response twice
            res.status(500).json({ error: err.message });
        }
    }
 };
 


module.exports.getFare = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { pickup, destination } = req.query;
   try {
      const fair = await rideService.getFair(pickup, destination);
      res.json({ fair });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

module.exports.confirmRide = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { rideId } = req.body;
   try {
      const ride = await rideService.confirmRide({rideId, captain: req.caption});

      sendMessageToSocketId(ride.user.socketId, {
         event: 'ride-confirmed',
         data: ride
      });

      return res.status(200).json(ride);
   } catch (err) {
      // console.log(err);
      res.status(500).json({ error: err.message });
   }
}

module.exports.startRide = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   const { rideId, otp } = req.query;

   try {
       const ride = await rideService.startRide({ rideId, otp, captain: req.caption });

      //  console.log(ride);

       sendMessageToSocketId(ride.user.socketId, {
           event: 'ride-started',
           data: ride
       })

       return res.status(200).json(ride);
   } catch (err) {
       return res.status(500).json({ message: err.message });
   }
}

module.exports.finishRide = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   const { rideId } = req.body;

   try {
       const ride = await rideService.finishRide({ rideId, captain: req.caption });

       sendMessageToSocketId(ride.user.socketId, {
           event: 'ride-finished',
           data: ride
       })

       return res.status(200).json(ride);
   } catch (err) {
       return res.status(500).json({ message: err.message });
   }
}