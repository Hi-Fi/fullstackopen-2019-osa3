const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "045-1236543",
      "id": 1
    },
    {
        "name": "Arto Järvinen",
        "number": "041-21423123",
        "id": 2
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-4323234",
        "id": 3
    },
    {
      "name": "Martti Tienari",
      "number": "09-784232",
      "id": 4
    }   
]
  
app.get('/info', (req, res) => {
    res.status(200).send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
res.json(persons)
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
    const id = Number(req.params.id)
    persons = persons.filter( person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})