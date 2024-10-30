const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    const blogs = []

    assert.strictEqual(favoriteBlog(blogs), null)
  })

  test('blogs list with one element equals that element', () => {
    const blogs = [
      {
        "title": "My Blog Post",
        "author": "Me",
        "url": "http//localhost:3003/my-blog-post",
        "likes": 5,
      }
    ]

    assert.strictEqual(favoriteBlog(blogs), blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { "likes": 5 },
      { "likes": 10},
      { "likes": 2}
    ]

    assert.strictEqual(favoriteBlog(blogs), blogs[1])
  })
})