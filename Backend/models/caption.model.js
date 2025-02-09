const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captionSchema = new mongoose.Schema({
   fullname: {
      firstname: {
         type: String,
         required: true,
         minlength: [3, "firstname should be atleast 3 characters long"]
      },
      lastname: {
         type: String,
         minlength: [3, "lastname should be atleast 3 characters long"],
      },
   },
   email: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "email should be atleast 6 characters long"],
   },
   password: {
      type: String,
      required: true,
   },
   socketId: {
      type: String,
   },
   status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
   },
   vehicle: {
      color: {
         type: String,
         required: true,
         minlength: [3, "color must be at least 3 characters long"]
      },
      plate: {
         type: String,
         required: true,
         minlength: [3, "plate no. must be at least 3 characters long"]
      },
      capacity: {
         type: String,
         required: true,
         minlength: [1, "capacity must be at least 1"]
      },
      vehicleType: {
         type: String,
         required: true,
         enum: ['car', 'auto', 'moto']
      },
   },
   location: {
      ltd: {
         type: Number
      },
      lng: {
         type: Number
      }
   }
});

// Geospatial Index on the location field (ltd, lng)
captionSchema.index({ location: '2dsphere' });

captionSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
   return token;
};

captionSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
};

captionSchema.statics.hashPassword = async function(password) {
   return await bcrypt.hash(password, 10);
};

const captionModel = mongoose.model('captain', captionSchema);

module.exports = captionModel;
