const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    assert.strictEqual(totalLikes(blogs), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        "title": "My Blog Post",
        "author": "Me",
        "url": "http//localhost:3003/my-blog-post",
        "likes": 5,
      }
    ]

    assert.strictEqual(totalLikes(blogs), 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { "likes": 5 },
      { "likes": 10},
      { "likes": 2}
    ]

    assert.strictEqual(totalLikes(blogs), 17)
  })
})