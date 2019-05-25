const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://hifi-fs:${password}@hi-fi-mongo-f4bq2.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
    let person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })
      person.save().then(response => {
        console.log(`lisätään ${person.name} numero ${person.number} luetteloon`);
        mongoose.connection.close();
      })
} else {
    Person.find({}).then (results => {
        console.log("Puhelinluettelo:")
        results.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
        mongoose.connection.close();
    })
}