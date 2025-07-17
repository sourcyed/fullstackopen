import { addAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../context/notificationHook"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatchNotification({type: 'SET_NOTIFICATION', payload: `anecdote '${newAnecdote.content}' added`})
      setTimeout(() => dispatchNotification({type: 'RESET_NOTIFICATION'}), 5000)
    },
    onError: (error) => {
      const errorMessage = (error) => {
        const message = error.message
        if (error.message.includes('400'))
          return 'too short anecdote, must have length 5 or more'
        else
          return `can't connect to the server`
      }
      dispatchNotification({type: 'SET_NOTIFICATION', payload: errorMessage(error)})
      setTimeout(() => dispatchNotification({type: 'RESET_NOTIFICATION'}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
