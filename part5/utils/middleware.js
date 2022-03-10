const logger = require('./logger')
const Users = require('../models/users')
const Blog = require('../models/blog')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ 
      error: 'malformatted id' 
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ 
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  logger.error(error.message)
  next(error)
}

// 4.20*: blogilistan laajennus, step8
const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

// 4.22*: blogilistan laajennus, step10
const userExtractor = (request, response, next) => {
  let method = request.method
  console.log(method)

  if (method === 'POST') {
    let userId = request.body.userID
    request.user = userId
  } else if (method === 'DELETE') {
    let blogId = request.path.split('/').slice(-1)[0]
    request.user = blogId
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}