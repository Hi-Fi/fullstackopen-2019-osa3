require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
  })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, req, res, next) => {  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)
  
app.get('/info', (req, res) => {
    res.status(200).send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        console.log(persons)
        res.json(persons)
      });
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.name) {
        return res.status(400).json({error: "Nimi on pakollinen tieto"})
    } else if (!person.number) {
        return res.status(400).json({error: "Numero on pakollinen tieto"})
    }

    const personObject = new Person({
        name: person.name,
        number: person.number
    })
    personObject.save().then( savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    let person = persons.find( person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send("Henkilöä ei löytynyt")
    }
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})