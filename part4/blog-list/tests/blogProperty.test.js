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

test('returned blogs have id property', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  for (let blog of response.body) {
    assert(Object.hasOwn(blog, 'id'))
  }
})

test('returned blogs do not have _id property', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    for (let blog of response.body) {
      assert(!Object.hasOwn(blog, '_id'))
    }
})

after(async () => {
  await mongoose.connection.close()
})