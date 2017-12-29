const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const mongoDB = process.env.DB_NAME

app.use(cors())

mongoose.connect(mongoDB, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection Error!'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES

const user = require('./routers/user')

app.use('/user', user)

app.listen(process.env.PORT_DEF, () => {
  console.log('AYO JALAN!')
})

module.exports = app