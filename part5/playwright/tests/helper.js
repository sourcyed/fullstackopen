import { expect } from '@playwright/test'

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill(title)
  await textboxes[1].fill(author)
  await textboxes[2].fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.locator('.blogs').getByText(title).waitFor()
}

async function likeBlog(page, blogName, times = 1) {
  const blog = page.getByText(blogName).locator('..')
  await blog.getByRole('button', { name: 'view' }).click()
  for (let i = 0; i < times; i++) {
    await blog.getByRole('button', { name: 'like' }).click()
    const expectedLikes = `likes ${i + 1}`
    await blog.getByText(expectedLikes).waitFor()
  }
  return blog
}

export { loginWith, createBlog, likeBlog }