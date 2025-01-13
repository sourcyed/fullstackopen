const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "My Blog Post",
    "author": "Me",
    "url": "http://localhost:3003/my-blog-post",
    "likes": 5
  },
  {
    "title": "Your Blog Post",
    "author": "You",
    "url": "http://localhost:3003/your-blog-post",
    "likes": 1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}