const express = require('express')

const router = express.Router()
// import { signupUser, loginuser } from '../controllers/userController'

const { signupUser, loginuser } = require('../controllers/userController')
// login user
router.post('/login',loginuser)
// router.get('/admin12',getallUser)
// Signup User
router.post('/signup',signupUser)

module.exports=router