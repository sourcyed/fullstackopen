import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({anecdotes, filter}) => {
    const sorted = [...anecdotes].sort((a,b) => b.votes - a.votes)
    return filter
      ? sorted.filter(an => an.content.toLowerCase().includes(filter.toLowerCase()))
      : sorted
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList