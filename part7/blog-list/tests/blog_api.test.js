const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token = ''

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'blogmaster', passwordHash })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24 })

  const blogsWithUsers = helper.initialBlogs.map(blog => {
    blog.user = user.id
    return blog
  })

  await Blog.deleteMany({})
  await Blog.insertMany(blogsWithUsers)
})

describe('blog addition tests', () => {
  test('new blog added successfully', async () => {
    const newBlog =   {
      "title": "Their Blog Post",
      "author": "They",
      "url": "http://localhost:3003/their-blog-post",
      "likes": 7
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  })

  test('empty likes default to 0', async () => {
    const newBlog = {
      "title": "Their Blog Post",
      "author": "They",
      "url": "http://localhost:3003/their-blog-post"
    }

    await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
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
})

describe('blog count tests', () => {
  test('returned blog count is correct', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('blog property test', () => {
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
})

describe('deleting blogs', () => {
  test('succeeds with status code 204 if id and token are valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('succeeds with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)
    assert(titles.includes(blogToDelete.title))
  })
})

describe('updating blogs', () => {
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