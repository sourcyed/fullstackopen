import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(p => setPersons(p))
  }, [])

  const popNotification = (message, type) => {
    const n = { message, type }
    setNotification(n)
    setTimeout(() => setNotification(null) , 5000)
  }

  const addPerson = event => {
    event.preventDefault()
    if (newName.trim() === '') return

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(p => p.name == newName)

    if (duplicate) {
      newPerson.id = duplicate.id
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        personService.update(newPerson)
          .then(nP => setPersons(persons.map(p => p.id !== nP.id ? p : nP)))
          .catch(() => popNotification(`Information of ${newName} has already been removed from server`, 'error'))
    }
    else {
      personService.create(newPerson)
        .then(p => setPersons(persons.concat(p)))
        .then(() => popNotification('Added ' + newName, 'confirmation'))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleInput = setFunc => event => setFunc(event.target.value)

  const delHandler = pToDel => () => {
    if (window.confirm(`Delete ${pToDel.name} ?`))
      personService.del(pToDel.id)
        .then(setPersons(persons.filter(p => p.id !== pToDel.id)))
        .catch(() => popNotification(`${pToDel.name} is already deleted`, 'error'))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filterName={filterName} onChange={handleInput(setFilter)}/>

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleInput(setNewName)} handleNewNumber={handleInput(setNewNumber)}/>

      <h3>Numbers</h3>
      <Persons filterName={filterName} persons={persons} delHandler={delHandler}/>
    </div>
  )
}

export default App