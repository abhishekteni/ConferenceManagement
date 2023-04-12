const Paper = require('../models/paperModel')
const User = require('../models/userModel')

const mongoose = require('mongoose')

// get all papers
const getPapers = async (req, res) => {


  const user_id = req.user._id
  const admin = req.user.role
  // console.log(admin)
  if(admin=='admin'||admin=='reviewer'){

    const papers = await Paper.find({}).sort({createdAt: -1})
    res.status(200).json(papers)
  }
  else{
    const papers = await Paper.find({user_id}).sort({createdAt: -1})
    res.status(200).json(papers)
  }
}

// get all user

const getallUser = async (req, res) => {


  // const user_id = req.user._id
  const email_id = req.user.email
  const admin = req.user.role
  // console.log(admin)
  if(admin=='admin'){

    const papers = await User.find({}).sort({createdAt: -1})
    res.status(200).json(papers)
  }
  else{
    const papers = await User.find({email:email_id}).sort({createdAt: -1})
    res.status(200).json(papers)
  }
}
// get a single paper
const getPaper = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such paper'})
  }

  const paper = await Paper.findById(id)

  if (!paper) {
    return res.status(404).json({error: 'No such paper'})
  }
  
  res.status(200).json(paper)
}


// create new paper
const createPaper = async (req, res) => {
  const {papertitle, authors, keywords,abstract,pdf_attachment} = req.body
  const blog_status="pending"
  const overall_score = 0
  const reviewer_comment=''
  const private_comment=''
  const isDraft=false;
  let emptyFields = []

  if(!papertitle) {
    emptyFields.push('papertitle')
  }
  if(!authors) {
    emptyFields.push('authors')
  }
  if(!keywords) {
    emptyFields.push('keywords')
  }
  if(!abstract) {
    emptyFields.push('abstract')
  }
  if(!pdf_attachment) {
    emptyFields.push('pdf_attachment')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id= req.user._id
    
    const paper = await Paper.create({papertitle, authors, keywords,abstract,pdf_attachment,blog_status:blog_status|| "pending" ,overall_score:overall_score||0,reviewer_comment:reviewer_comment||'', private_comment:private_comment||'', isDraft:isDraft, user_id})
    res.status(200).json(paper)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a paper
const deletePaper = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such paper'})
  }

  const paper = await Paper.findOneAndDelete({_id: id})

  if (!paper) {
    return res.status(400).json({error: 'No such paper'})
  }

  res.status(200).json(paper)
}

// update a paper
const updatePaper = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such paper'})
  }

  const paper = await Paper.findOneAndUpdate({_id: id}, {
    ...req.body
  },{new: true})

  if (!paper) {
    return res.status(400).json({error: 'No such paper'})
  }

  res.status(200).json(paper)
}

const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  },{new: true})

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

const updateallPaper = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such paper'})
  }

  const paper = await Paper.find({}, {
    ...req.body
  },{new: true})

  if (!paper) {
    return res.status(400).json({error: 'No such paper'})
  }

  res.status(200).json(paper)
}


module.exports = {
  getPapers,
  getPaper,
  createPaper,
  deletePaper,
  updatePaper,
  updateallPaper,
  updateUser,
  getallUser
}