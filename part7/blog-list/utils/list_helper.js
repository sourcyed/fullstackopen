const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, x) => sum + x.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]
  return blogs.reduce((max, x) => x.likes > max.likes ? x : max, blogs[0])
}

const mostBlogs = (blogs) => {
  let frequency = {}
  blogs.forEach(x => frequency[x.author] = (frequency[x.author] || 0) + 1)
  let max = { author: null, blogs: 0}
  for (const [key, value] of Object.entries(frequency))
    if (value >= max.blogs)
      max = { author: key, blogs: value}
  return max
}

const mostLikes = (blogs) => {
  let frequency = {}
  blogs.forEach(x => frequency[x.author] = (frequency[x.author] || 0) + x.likes)
  let max = { author: null, likes: 0}
  for (const [key, value] of Object.entries(frequency))
    if (value >= max.likes)
      max = { author: key, likes: value}
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}