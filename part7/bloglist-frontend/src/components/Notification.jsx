import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  }
  const { message, type } = notification

  // Map notification types to Tailwind styles
  const baseStyle = 'max-w-xl mx-auto my-4 p-4 rounded text-center font-medium'
  const typeStyles = {
    confirmation: 'bg-green-100 text-green-800 border border-green-300',
    error: 'bg-red-100 text-red-800 border border-red-300',
  }

  return (
    <div
      className={`${baseStyle} ${
        typeStyles[type] || 'bg-gray-100 text-gray-800 border border-gray-300'
      }`}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  )
}

export default Notification
