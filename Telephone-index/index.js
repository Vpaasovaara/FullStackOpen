//const { request, response } = require('express')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Persons = require('./models/persons')
const config = require('./utils/config')


const PORT = process.env.PORT || 3001
/*app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/


mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, console.log(`listening on port: ${PORT}`))
}).catch((e) => {
  console.log(e)
})


app.use(cors())
app.use(express.static('build'))
// 3.7: puhelinluettelon backend step7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// 3.8*: puhelinluettelon backend step8
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static('public'))

// 3.16: puhelinluettelo ja tietokanta, step4
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)


app.get('/', (req, res) => {
  res.send('<h1>Hello World!<h1>')
})




// Tehtävä 3.1 puhelinluettelon backend step1
app.get('/api/persons', (req, res) => {
  Persons.find({})
    .select({ __v: 0, _id: 0 })
    .then(persons => {
      res.json(persons)
    })
    .catch((e) => {
      console.log(e)
    })
})

// Tehtävä 3.2: puhelinluettelon backend step2
// 3.18*: puhelinluettelo ja tietokanta, step6
app.get('/info', (req, res) => {
  Persons.find({}).then(persons => {
    res.send(`<p>Phonebook has info for 
		${persons.length} people</p><br>
		${new Date()}`)
  })
  .catch((e) => {
    console.log(e)
  })
})

// Tehtävä 3.3: puhelinluettelon backend step3
app.get('/api/persons/:id', (request, response) => {
  Persons.find({ id: Number(request.params.id) })
    .select({ __v: 0, _id: 0 })
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((e) => {
      console.log(e)
    })

})

// Tehtävä 3.4: puhelinluettelon backend step4
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  // 3.15: puhelinluettelo ja tietokanta, step3
  Persons.deleteOne({ id: id })
    .then(person => {
      console.log(person)
      res.status(204).end()
    })
    .catch((e) => {
      console.log(e)
    })
  //persons = persons.filter(person => person.id !== id)
})

// 3.5: puhelinluettelon backend step5
app.post('/api/persons', (request, response) => {
  Persons.find({}).then(persons => {
    const random = Math.floor(Math.random() * 1000)
	  const person = request.body
	  const listOfPersons = persons.map(x => x.name)

	  // 3.6: puhelinluettelon backend step6
	  if (!person.name || !person.number) {
	  	response.status(404)
	  		.send({ error: 'Must have name and number' })
	  } else if (listOfPersons.indexOf(person.name) >= 0) {
	  	response.status(404)
	  		.send({ error: 'Name already exists!' })
	  } else if (listOfPersons.indexOf(person.name) === -1 ) {
      let newPerson = new Persons({ name: person.name, number: person.number, id: random })
      newPerson.save()
        .then(savedPerson => {
          response.json(savedPerson)
          //mongoose.connection.close()
        })
        .catch((e) => {
          console.log(e)
        })
	  }
  })
})


app.put('/api/persons/:id', async(req, res) => {
  console.log('req body number', req.body.number)
  console.log('req.params.id', req.params.id)

  Persons.find({}).then(persons => {
    let index = Number(persons.map(x => x.id).indexOf(req.body.id))
	  console.log(index)

	  let copyOfPersons = [...persons]
	  copyOfPersons.splice(index, 1, req.body)
	  res.send(copyOfPersons)
  })
  .catch((e) => {
    console.log(e)
  })
  // 3.17*: puhelinluettelo ja tietokanta, step5
  await Persons.replaceOne({ id: req.params.id },
    {
      name: req.body.name,
      number: req.body.number,
      id: req.body.id
    },
    function(err) {
      console.log(err)
    })
})
