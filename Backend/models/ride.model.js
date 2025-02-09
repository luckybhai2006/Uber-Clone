const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      captain: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'captain',
      },
      pickup: {
         type: String,
         required: true,
      },
      destination: {
         type: String,
         required: true,
      },
      fair: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ['pending', 'accepted', 'ongoing','completed', 'cancelled'],
         default: 'pending',
         
      },
      duration: {
         type: Number,
      },// in seconds
      distance: {
         type: String,
         // required: true,
      },// in meters
      payment_id: {
         type: String,
      },
      order_id: {
         type: String,
      },
      signature: {
         type: String,
      },
      otp: {
         type: String,
         select: false,
         required: true,
      },
})

module.exports = mongoose.model('ride', rideSchema);