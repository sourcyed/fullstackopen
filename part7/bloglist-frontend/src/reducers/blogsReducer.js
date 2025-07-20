import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, addBlog } = blogsSlice.actions

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(blog)
    dispatch(addBlog(newBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer