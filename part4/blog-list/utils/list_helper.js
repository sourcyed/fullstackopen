const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, x) => sum + x.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, x) => x.likes > max.likes ? x : max, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}