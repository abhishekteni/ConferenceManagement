const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// for hashing password
const Schema = mongoose.Schema
// validator is used for creating appropriate email_id and Strong Password
const validator = require('validator') 

// assigned role in user schema 
const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique:true 
    },
    password: {
      type: String,
      required: true
    },
    role: {
        type: String,
        default: 'author',
        enum: ["author", "reviewer", "admin"]
       }

  })
  

//   static sign up method

// we can't use arrow function here or else we can't use "this" key word  
userSchema.statics.signup= async function (email,password,role){
    
    // validation 

    // we check whether we have email, password, and then we check for appropriate email and strong pass 
    if(!email||!password){
        throw Error("All values must be entered ")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Email is invalid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is weak")
    }
    
    const exists= await this.findOne({email})
    // although we have the unique element, but this creates a extra layer of security for the existing email
    if(exists){
        throw Error('Email already exists')
    }

    
    const salt = await bcrypt.genSalt(10)
    // add random set of char before the actual password
    const hash= await bcrypt.hash(password,salt)
    // hashing the password
    const User = await this.create({email,password:hash, role: role || "author" })
    return User
}

//   static sign in method

userSchema.statics.login= async function (email,password,role){
    if(!email||!password){
        throw Error("All values must be entered ")
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
     
    return user

}

  module.exports = mongoose.model('User', userSchema )