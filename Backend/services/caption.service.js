// THE PARTICULAR FUNCTION IS USED TO CREATE CAPTION AND CHECK SOME ISSUES IF OCOURE WHILE CREATING Captain

const captionModel = require('../models/caption.model');

module.exports.createCaption = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType}) => {
   if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
      throw new Error('All fields are required');
   }

   try {
      const caption = await captionModel.create({
         fullname: { firstname, lastname },
         email,
         password,
         vehicle: {
            color,
            plate,
            capacity,
            vehicleType
         }
      });
      return caption;
   } catch (error) {
      // console.error('Error creating user:', error.message);
      throw new Error('Error creating user: ' + error.message);
   }
};
