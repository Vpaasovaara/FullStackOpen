const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const postsRouter = require('./controllers/posts')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
}).then(() => {
    logger.info('connected to mongoose')
}).catch((error) => {
    logger.error('error connection to mongoose', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app