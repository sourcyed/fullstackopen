const Persons = ( {persons, filterName, delHandler}) => {
    const filter = filterName.trim().toLowerCase()
    const personsToShow = (filterName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        personsToShow.map(person => <Person key={person.id} person={person} delHandler={delHandler(person)}/>)
    )
}

const Person = ({person, delHandler}) => (
    <ol>
        {person.name} {person.number} &#9;
        <button onClick={delHandler}>delete</button>
    </ol>
)

export default Persons