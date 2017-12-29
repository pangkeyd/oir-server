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

module.exports = {
  getUser
}