const jwt = require('jsonwebtoken')

const User = require('../models/user.model.js')
const { UnauthenticatedError } = require('../errors')



const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.profile = { _id: payload._id, username: payload.username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth