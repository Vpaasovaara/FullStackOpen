const { request, response } = require('express')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()
const morgan = require('morgan')

// 3.7: puhelinluettelon backend step7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// 3.8*: puhelinluettelon backend step8
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


let persons = [
	{
	  id: 1,
	  name: "Arto Hellas",
	  number: "040-123456"
	},
	{
	  id: 2,
	  name: "Ada Lovelace",
	  number: "39-44-5323523"
	},
	{
	  id: 3,
	  name: "Dan Abramov",
	  number: "12-43-234345"
	},
	{
	  id: 4,
	  name: "Mary Poppendic",
	  number: "39-23-6423122"
	}
]


app.get(`/`, (req, res) => {
	res.send('<h1>Hello World!<h1>')
})


const port = 3001
app.listen(port, () => {
	console.log(`Server running on port ${port}`) 
})

// Tehtävä 3.1 puhelinluettelon backend step1
app.get('/api/persons', (req, res) => {
	res.json(persons)
})

// Tehtävä 3.2: puhelinluettelon backend step2
app.get('/info', (req, res) => {
	res.send(`<p>Phonebook has info for 
		${persons.length} people</p><br>
		${new Date()}`)
})

// Tehtävä 3.3: puhelinluettelon backend step3
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons
		.find(person => person.id === id)
	person ? response.json(person) : response.status(404).end()
})

// Tehtävä 3.4: puhelinluettelon backend step4
app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})

// 3.5: puhelinluettelon backend step5
app.post('/api/persons', (request, response) => {
	const random = Math.floor(Math.random() * 1000)
	const person = request.body
	const listOfPersons = persons.map(x => x.name);

	// 3.6: puhelinluettelon backend step6
	if (!person.name || !person.number) {
		response.status(404)
			.send({ error: 'Must have name and number' })
	} else if (listOfPersons.indexOf(person.name) >= 0) {
		response.status(404)
			.send({ error: "Name already exists!" })
	} else if (listOfPersons.indexOf(person.name) === -1 ) {
		const newPerson = { 
			id: random,
			name: person.name,
			number: person.number
		}
		console.log(newPerson, "tämä on konsoli")
		persons.push(newPerson)
		response.json(newPerson)
	}
})



