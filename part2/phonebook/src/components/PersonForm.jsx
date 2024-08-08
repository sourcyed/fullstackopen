const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <label htmlFor='nameInput'>name:</label>
                <input id='nameInput' value={props.newName} onChange={props.handleNewName}/>
                <label htmlFor='numberInput'>number:</label> 
                <input id='numberInput' value={props.newNumber} onChange={props.handleNewNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm