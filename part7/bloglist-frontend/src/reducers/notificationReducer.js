import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ''
    },
  },
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const addNotification = (notification, delay) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(resetNotification()), delay * 1000)
  }
}

export default notificationSlice.reducer
