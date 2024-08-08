import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='nameInput'>name:</label>
          <input id='nameInput' value={newName} onChange={event => setNewName(event.target.value)}/>
          <label htmlFor='numberInput'>number:</label> 
          <input id='numberInput' value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {persons.map(person => <ol key={person.name}>{person.name} {person.number}</ol>)}
    </div>
  )
}

export default App