const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body)
    return response.status(400).end()
  if (!request.body.title || !request.body.url)
    return response.status(400).end()
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }


  request.body.user = request.user

  const blog = new Blog(request.body)

  const result = await blog.save()
  request.user.blogs = request.user.blogs.concat(result._id)
  await request.user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }
  const userId = blog.user

  if (request.user.id.toString() === userId.toString()) {
    await blog.deleteOne()
    return response.status(204).end()
  }
  console.log(4)
  return response.status(401).json({ error: 'invalid user' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = { ...body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter