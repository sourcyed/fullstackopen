const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  if (!request.body)
    return response.status(400).end()
  if (!request.body.title || !request.body.url)
    return response.status(400).end()
  if (!request.body.user)
    request.body.user = await User.findOne({}).schemaLevelProjections(x => x.id)

  const blog = new Blog(request.body)

  const result = await blog.save()
  const user = await User.findById(request.body.user)
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = { ...body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter