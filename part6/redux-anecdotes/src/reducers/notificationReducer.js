import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Initial notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const addNotification = (notification, delay) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setInterval(() => dispatch(removeNotification()), delay * 1000)
  }
}

export default notificationSlice.reducer