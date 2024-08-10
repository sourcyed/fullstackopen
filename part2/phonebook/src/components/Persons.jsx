const Persons = ( {persons, filterName}) => {
    const filter = filterName.trim().toLowerCase()
    const personsToShow = (filterName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        personsToShow.map(person => <Person key={person.id} person={person}/>)
    )
}

const Person = ({person}) => <ol>{person.name} {person.number}</ol>

export default Persons