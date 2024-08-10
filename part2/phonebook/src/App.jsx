import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(p => setPersons(p))
  }, [])

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
        personService.update(newPerson).then(nP => setPersons(persons.map(p => p.id !== nP.id ? p : nP)))
    }
    else
      personService.create(newPerson).then(p => setPersons(persons.concat(p)))

    setNewName('')
    setNewNumber('')
  }

  const handleInput = setFunc => event => setFunc(event.target.value)

  const delHandler = pToDel => () => {
    if (window.confirm(`Delete ${pToDel.name} ?`))
      personService.del(pToDel.id).then(setPersons(persons.filter(p => p.id !== pToDel.id)))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChange={handleInput(setFilter)}/>

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleInput(setNewName)} handleNewNumber={handleInput(setNewNumber)}/>

      <h3>Numbers</h3>
      <Persons filterName={filterName} persons={persons} delHandler={delHandler}/>
    </div>
  )
}

export default App