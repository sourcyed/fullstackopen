const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('new blog added successfully', async () => {
  const newBlog =   {
    "title": "Their Blog Post",
    "author": "They",
    "url": "http://localhost:3003/their-blog-post",
    "likes": 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('empty likes default to 0', async () => {
  const newBlog = {
    "author": "They",
    "url": "http://localhost:3003/their-blog-post"
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')

assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
assert.strictEqual(response.body[response.body.length-1].likes, 0)
})

test('missing title or url gives bad request', async () => {
  const newBlog = {
    
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})