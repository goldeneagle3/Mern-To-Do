const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true,"Provide a valid title"]
  },
  text:{
    type: String
  },
  top: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
},{timestamps:true})


module.exports = mongoose.model('Post',PostSchema)