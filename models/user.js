const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 6

let user = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  salt: String
})

let User = mongoose.model('User_oir', user)

let getUser = (cb) => {
  User.find({}, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

let uniqueEmail = (params, cb) => {
  User.find({
    email: params.email
  }, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

let uniqueUsername = (params, cb) => {
  User.find({
    username: params.username
  }, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

let signUp = (body, cb) => {
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash(body.password, salt, (errors, hash) => {
      let userSchema = new User({
        email: body.email,
        username: body.username,
        password: hash,
        salt: hash
      })
      userSchema.save((err, user) => {
        if(!err){
          cb(user)
        }else if(err){
          if(err.message.indexOf('email_1') !== -1){
            let errorEmail = `Email '${body.email}' already used!`
            cb(null, errorEmail)
          }else if(err.message.indexOf('username_1') !== -1){
            let errorUser = `Username '${body.username}' already used!`
            cb(null, errorUser)
          }
        }
      })
    })
  })
}

let signIn = (body, cb) => {
  let query = {
    $or: [
      { email: body.email },
      { username: body.username }
    ]
  }

  User.find(query, (error, user) => {
    if(user.length > 0){
      let resPass = bcrypt.compareSync(body.password, user[0].salt)
      if(resPass){
        let obj = {
          id: user[0]._id,
          username: user[0].username
        }
        let token = jwt.sign(obj, process.env.SECRET_KEY)
        cb(token, null)
      }else{
        let wrong = 'Wrong Username or Password!'
        cb(null, wrong)
      }
    }else{
      let wrong = `Wrong Username or Password!`
      cb(null, wrong)
    }
  })
}

module.exports = {
  getUser,
  uniqueEmail,
  uniqueUsername,
  signUp,
  signIn
}