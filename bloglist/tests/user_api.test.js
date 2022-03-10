const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Users = require('../models/users')
const bcrypt = require('bcrypt')

const initialUsers = [
    {
      username: `username1`,
      password: `salasana`,
      name: `nimi`
    },
    {
      username: `username2`,
      password: `salasana`,
      name: `nimi`
    },
    {
      username: `username3`,
      password: `salasana`,
      name: `nimi`
    }
]
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await Users.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new Users({ 
      username: 'root',
      name: 'test',
      password: passwordHash })

    await user.save()
    /*const blogObjects = initialUsers.map(user => 
      new Users(user))
    const promiseArray = blogObjects.map(user => user.save())
    await Promise.all(promiseArray)*/
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('test POST validation for existing username', async () => {
      const initialC = await api.get(`/api/users`)    
      const newUser = {
        username: `root`,
        password: `salasana`,
        name: `nimi`
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      const response = await api.get(`/api/users`)
      expect(response.body).toHaveLength(initialC.body.length)
  })
  
  test('test POST validation for short password', async () => {
      const newUser = {
        username: `unique1`,
        password: `sa`,
        name: `nimi`
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      const response = await api.get(`/api/users`)
      expect(response.body).toHaveLength(1)
  })
  
  test('test POST validation for short username', async () => {
      const newUser = {
        username: `uh`,
        password: `salasana`,
        name: `nimi`
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      const response = await api.get(`/api/users`)
      expect(response.body).toHaveLength(1)
  })
  
  test('POST request succesfull', async () => {
      const usersStart = await api.get(`/api/users`)
  
      const newUser = {
        username: `POSTtest`,
        password: `salasana`,
        name: `nimi`
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersEnd = await api.get(`/api/users`)
      expect(usersEnd.body).toHaveLength(usersStart.body.length + 1)
  
      const usernames = usersEnd.body.map(u => u.username)
      expect(usernames).toContain(newUser.username)
  })
})
