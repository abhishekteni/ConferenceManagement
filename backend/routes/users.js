const express = require('express')

const router = express.Router()
// import { signupUser, loginuser } from '../controllers/userController'

const { signupUser, loginuser } = require('../controllers/userController')
router.post('/login',loginuser)

// router.get('/admin12',getallUser)
router.post('/signup',signupUser)

module.exports=router