
const User = require('../models/userModel')
const jwt= require('jsonwebtoken')

// we create jwt token here, and here _id:_id is payload and SECRET is our secret key, and deadline
const createToken=(_id)=>{
return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'1d'})
}

// login user
const loginuser=async (req,res)=>{
    const {email,password}=req.body

    try{
        const user= await User.login(email,password)

        // create a token
        const token = createToken(user._id)

        // we respond by giving status 200(all ok) 
        res.status(200).json({email,role:user.role,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

    // res.json({mssg:'login user'})
}

const signupUser=async (req,res)=>{
    const {email,password,role}= req.body

    // try catch so that we do not ignore existing email
    try{
        const user= await User.signup(email,password,role)
        // create a token
        const token = createToken(user._id)

        // we respond by giving status 200(all ok) 
        res.status(200).json({email,role,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

    // res.json({mssg:'signup user'})
}


module.exports={signupUser,loginuser}