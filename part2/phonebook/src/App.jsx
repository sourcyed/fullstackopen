import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const addPerson = event => {
    event.preventDefault()
    if (newName === '') return

    if (persons.map(p => p.name).includes(newName)) {
      alert (`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  const handleInput = setFunc => event => setFunc(event.target.value)

  const personsToShow = (filterName === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filterName} onChange={handleInput(setFilter)}/>
      </div>

      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='nameInput'>name:</label>
          <input id='nameInput' value={newName} onChange={handleInput(setNewName)}/>
          <label htmlFor='numberInput'>number:</label> 
          <input id='numberInput' value={newNumber} onChange={handleInput(setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {personsToShow.map(person => <ol key={person.name}>{person.name} {person.number}</ol>)}
    </div>
  )
}

export default App