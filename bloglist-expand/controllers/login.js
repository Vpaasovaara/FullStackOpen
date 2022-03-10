const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/users')

// 4.18: blogilistan laajennus, step6
loginRouter.post('/', async(req, res) => {
    const body = req.body

    const user = await Users.findOne({ username: body.username })
    console.log("user", user)
    console.log(await bcrypt.compare(body.password, user.password))

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.password)
    console.log("passwordCorrect", passwordCorrect)
    
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
    
    try {
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      console.log("userForToken", userForToken)

      const token = jwt.sign(
        userForToken, 
        process.env.SECRET
      )
    
      res
        .status(200)
        .send({ token, username: user.username, name: user.name })
      
    }
    catch (err) {
      console.log(err)
    }
  })
  
  module.exports = loginRouter