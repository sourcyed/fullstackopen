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
    },
    replaceBlog(state, action) {
      const newBlog = action.payload
      const index = state.findIndex((blog) => blog.id === newBlog.id)
      state[index] = newBlog
    },
    removeBlog(state, action) {
      const targetBlog = action.payload
      const filtered = state.filter((blog) => blog.id !== targetBlog.id)
      return filtered
    },
    _commentBlog(state, action) {
      const targetBlog = action.payload.blog
      state.find(blog => blog.id === targetBlog.id).comments.push(action.payload.comment)
    }
  },
})

export const { setBlogs, addBlog, replaceBlog, removeBlog, _commentBlog } = blogsSlice.actions

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.likeBlog(blog)
    dispatch(replaceBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(removeBlog(blog))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.commentBlog(blog, comment)
    dispatch(_commentBlog({ blog, comment }))
  }
}

export default blogsSlice.reducer
