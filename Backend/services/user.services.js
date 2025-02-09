// THE PARTICULAR FUNCTION IS USED TO CREATE USER AND CHECK SOME ISSUES IF OCOURE WHILE CREATING USER

const userModel = require('../models/user.models');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
   if (!firstname || !lastname || !email || !password) {
      throw new Error('All fields are required');
   }

   try {
      const user = await userModel.create({
         fullname: { firstname, lastname },
         email,
         password
      });
      return user;
   } catch (error) {
      // console.error('Error creating user:', error.message);
      throw new Error('Error creating user: ' + error.message);
   }
};
