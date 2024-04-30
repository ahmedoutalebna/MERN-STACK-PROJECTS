const express = require('express')
const { register, authentication } = require('../controllers/auth.controllers')
const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post('/authentication', authentication)


module.exports = authRouter 