const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
   fullname: {
      firstname: {
         type: String,
         required: true,
         minlength: [3, "firstname should be atleast 3 characters long"]
      },
      lastname: {
         type: String,
         required: true,
         minlength: [3, "lasttname should be atleast 3 characters long"],
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
         default: null
      }
})

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
   return token
}
userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
