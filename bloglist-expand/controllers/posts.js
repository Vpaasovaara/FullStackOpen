const postsRouter = require('express').Router()
const Blog = require('../models/blog')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')

postsRouter.get('/', async (request, response) => {
  let result = await Blog
    .find({})
    .populate(`user`, { username: 1, name: 1, id: 1 })

  response.json(result)
})


postsRouter.post('/', async(request, response) => {
  let user2 = await Users.findById(request.user)
  
  // 4.19: blogilistan laajennus, step7
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await Users.findById(decodedToken.id)

  const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id
  })
  if (user2.username === decodedToken.username) {
    if (blog.title && blog.url) {
      let result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
  
      response.status(201).json(result)
  
    } else {
      response.status(400).end()
    }
  } else {
    response.status(401).json({ error: 'user and token doesnt match' })
  }
  
  
})

// 4.13 blogilistan laajennus, step1
postsRouter.delete('/:id', async(request, response) => {
  const id = request.params.id
  const currentBlog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)

  // 4.21*: blogilistan laajennus, step9
  if (currentBlog.author.toString() === decodedToken.username.toString()) {
    await Blog.deleteOne({ _id: id })
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token doesnt match user' })
  }
  
})

// 4.14* blogilistan laajennus, step2
postsRouter.put('/:id', async(request, response) => {

  await Blog.replaceOne({ _id: request.params.id },
    request.body, function(err) {
      console.log(err)
  })
  const blogs = await Blog.find({})
  response.send(blogs)
})

postsRouter.post('/:id/comments', async(request, response) => {
  const id = request.params.id
  const currentBlog = await Blog.findById(id)
  const comment = request.body.comment
  currentBlog.comments.push(comment)

  await Blog.replaceOne({ _id: id }, currentBlog, (err) => { console.log(err) })

  

  response.status(201).json(currentBlog)

})

module.exports = postsRouter