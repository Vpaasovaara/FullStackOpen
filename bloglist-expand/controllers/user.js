const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const Users = require('../models/users')

// 4.15: blogilistan laajennus, step3
usersRouter.get('/', async(request, response) => {
  const users = await Users
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  
  response.json(users.map(u => u.toJSON()))

})

// 4.16*: blogilistan laajennus, step4
usersRouter.post('/', async (request, response) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(request.body.password, salt)

    const user = new Users({
        username: request.body.username,
        password: hash,
        name: request.body.name,
    })

    let userList = await Users.find({})
    let usernames = userList.map(x => x = x.username)

    if (user.username.length < 3 || request.body.password.length < 3) {
      return response.status(400).json({ 
        error: 'username and password must be longer that 3 characters'
      })
    } else if (usernames.indexOf(user.username) >= 0) {
      return response.status(400).json({ 
        error: 'username must be unique'
      })
    } else {
      try {
        const result = await user.save()
        response.status(201).json(result)
        console.log(result)
      } catch (err) {
        console.log(err.message)
      }
    }
})

module.exports = usersRouter