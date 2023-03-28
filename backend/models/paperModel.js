const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paperSchema = new Schema({
  papertitle: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  keywords: {
    type: String
  },
  abstract: {
    type: String
  },
  pdf_attachment:{
    type: String,
    required: true
  },
  blog_status: {
    type: String,
    default: 'pending',
    enum: ["pending", "accept", "reject"]
   },
  user_id:{
    type:String,
    required:true
  }
}, { timestamps: true })

module.exports = mongoose.model('Paper', paperSchema)