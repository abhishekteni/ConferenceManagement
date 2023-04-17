const mongoose = require('mongoose')

const Schema = mongoose.Schema
// paper schema used only 1 schema for the entire paper scenario
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
    type: String
  },
  blog_status: {
    type: String,
    default: 'pending',
    enum: ["pending", "accept", "reject"]
   },
   overall_score:{
    type: Number,
    default: 0,
    enum: [-2,-1,0,1,2]
   },
   reviewer_comment:{
    type:String,
    default: '',
  },
  private_comment:{
    type:String,
    default: '',
  },
  isDraft:{
    type:Boolean,
    default: false
  },
  user_id:{
    type:String,
    required:true
  }
}, { timestamps: true })

module.exports = mongoose.model('Paper', paperSchema)