const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('updating blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeds if id is valid', async () => {
    const originalBlog = (await helper.blogsInDb())[0]
    const draftBlog = { ...originalBlog, title: 'Updated Blog' }
    await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(draftBlog)
      .expect(200)

    const updatedBlog = (await helper.blogsInDb())[0]
    assert.strictEqual(updatedBlog.title, draftBlog.title)  
  })
})

after(async () => {
  await mongoose.connection.close()
})