const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    trim:true,
    maxlength: 20,
    required:[true,"Please , provide a valid username"]
  },
  password:{
    type: String,
    required: [true,"Please , provide a valid password"]
  }
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}


module.exports = mongoose.model('User',UserSchema)