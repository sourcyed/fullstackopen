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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}