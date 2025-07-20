import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(window.localStorage.getItem('loggedUser')),
  reducers: {
    setUser(state, action) {
      const user = action.payload
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      return user
    },
    logout(state, action) {
      window.localStorage.removeItem('loggedUser')
      return null
    }
  }
})

export const { setUser, logout } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(username, password)
      dispatch(setUser(user))
    } catch (error) {
      throw Error('Cant login')
    }
  }
}

export default userSlice.reducer