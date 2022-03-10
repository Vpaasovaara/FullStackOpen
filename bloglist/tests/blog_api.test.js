const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: `test1`,
    author: `author1`,
    url: `url1`,
    likes: 0
  },
  {
    title: `test2`,
    author: `author1`,
    url: `url2`,
    likes: 1
  },
  {
    title: `test3`,
    author: `author1`,
    url: `url3`,
    likes: 2
  }
]

describe('make initial conditions', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new Users({ 
      username: 'blogiTestaaja',
      name: 'testaaja',
      password: passwordHash })

    await user.save()
    
    let newUser = await Users.findOne({ 
      username: 'blogiTestaaja'
    })

    const userForToken = {
      username: newUser.username,
      id: newUser._id
    }
    console.log("userForToken", userForToken)

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET
    )

    const blog = new Blog({
      title: 'testaajan bloki Start',
      author: 'testaaja',
      url: 'https://fullstackopen.com/osa4/token_perustainen_kirjautuminen',
      likes: 123,
      user: newUser._id
    })

    let result = await blog.save()
    newUser.blogs = newUser.blogs.concat(result._id)
    await user.save()

    /*await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => 
      new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)*/
  })
  
  // 4.8: blogilistan testit, step 1
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  
  // 4.9*: blogilistan testit, step2
  test('check that id is not undefined', () => {
    api
      .get('/api/blogs')
      .then(blogs => {
        for (let i = 0; i < blogs.length; i++) {
          expect(blogs[i].id.toBeDefined())
        }
      })
  })
  
  // 4.10: blogilistan testit, step 1
  test('test POST request', async () => {
    const blogStart = await api.get('/api/blogs')

    let newUser = await Users.findOne({ 
      username: 'blogiTestaaja'
    })

    const userForToken = {
      username: newUser.username,
      id: newUser._id
    }
    console.log("userForToken", userForToken)

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET
    )
    console.log("token", token)

    let testObj = {
      title: `POST req test`,
      author: `testaaja`,
      url: `url`,
      likes: 0,
      userID: newUser._id 
    }

    await api
      .post('/api/blogs')
      .send(testObj)
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    let response = await api.get('/api/blogs')
  
    let titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(blogStart.body.length + 1)
    expect(titles).toContain('POST req test')
  })
  
  // 4.11*: blogilistan testit, step4
  test('likes are set to 0 if no value is given', async () => {
    let newUser = await Users.findOne({ 
      username: 'blogiTestaaja'
    })

    const userForToken = {
      username: newUser.username,
      id: newUser._id
    }
    console.log("userForToken", userForToken)

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET
    )
    console.log("token", token)

    let testObj = {
      title: `test-no-likes`,
      author: `testaaja`,
      url: `url`,
      userID: newUser._id 
    }
    const expected = {
      title: `test-no-likes`,
      author: `testaaja`,
      url: `url`,
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(testObj)
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    let response = await api.get('/api/blogs')
    
    let s = response.body.filter(r => r.title === `test-no-likes`)
    let r = s[0]
    let final = {
      title: r.title, 
      author: r.author,
      url: r.url,
      likes: r.likes
    }
  
    expect(final).toEqual(expected)
  })
  
  // 4.12*: blogilistan testit, step5
  test('blog without title and url is not added', async () => {
    const blogStart = await api.get('/api/blogs')
    let newUser = await Users.findOne({ 
      username: 'blogiTestaaja'
    })

    const userForToken = {
      username: newUser.username,
      id: newUser._id
    }
    console.log("userForToken", userForToken)

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET
    )
    console.log("token", token)

    let newBlog = {
      author: `testaaja`,
      likes: 0,
      userID: newUser._id 
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  
    const blogList = await api.get('/api/blogs')
  
    expect(blogList.body).toHaveLength(blogStart.body.length)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
})
