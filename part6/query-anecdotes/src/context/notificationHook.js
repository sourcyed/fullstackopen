import { useContext } from "react"
import notificationContext from "./NotificationContext"

export const useNotificationValue = () => {
  const context = useContext(notificationContext)
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(notificationContext)
  return context[1]
}