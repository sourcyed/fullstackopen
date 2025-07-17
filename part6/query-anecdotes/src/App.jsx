import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch } from './context/notificationHook'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const handleVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(an => an.id !== newAnecdote.id ? an : newAnecdote)
      )
      dispatchNotification({type: 'SET_NOTIFICATION', payload: `anecdote '${newAnecdote.content}' voted`})
      setTimeout(() => dispatchNotification({type: 'RESET_NOTIFICATION'}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
