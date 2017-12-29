const express = require('express')
const router = express.Router()
const User = require('../controllers/user')

router.get('/', User.getData)

router.get('/email/:email', User.getUniqueEmail)

router.get('/username/:username', User.getUniqueUsername)

router.post('/signup', User.signUp)

router.post('/signin', User.signIn)

module.exports = router