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
  
app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.status(200).send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
      });
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        console.log(persons)
        res.json(persons)
      });
})

app.post('/api/persons', (req, res, next) => {
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
    .catch ( error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    console.log(req.params.id)
    Person.findById(req.params.id)
    .then( person => {
        console.log(person)
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).send("Henkilöä ei löytynyt")
        }
    })
    .catch( error => next(error) )
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = req.body
    const personObject = {
        number: person.number
    }
    Person.findByIdAndUpdate(req.params.id, personObject, {new: true})
    .then (updatedPerson => {
        res.json(updatedPerson.toJSON())
    })
    .catch( error => next(error) )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(409).json({error: `${request.body.name} on jo luettelossa`})
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})