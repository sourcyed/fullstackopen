const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state = action.payload
    case 'RESET_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export default notificationReducer