const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important' : 'make important'
    const className = `note${note.important ? ' important' : ''}`

    return (
        <li className={className}>
            {note.content} &nbsp;
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note