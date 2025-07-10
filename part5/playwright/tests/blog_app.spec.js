import { test, describe, expect, beforeEach } from '@playwright/test'
import { loginWith, createBlog, likeBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'User 1',
        username: 'user1',
        password: 'password1'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'User 2',
        username: 'user2',
        password: 'password2'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'password1')
      await expect(page.getByText('user1 logged in')).toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, 'nouser', 'nopassword')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('logged in')).not.toBeVisible()
    })
  })


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'user1', 'password1')
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'Test Title', 'Test Author', 'Test URL')
      await expect(page.locator('.blog').getByText('Test Title')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Title', 'Test Author', 'Test URL')
      })

      test('likes can be increased', async ({ page }) => {
        await likeBlog(page, 'Test Title')
        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Title 1', 'Test Author 1', 'Test URL 1')
        await createBlog(page, 'Test Title 2', 'Test Author 1', 'Test URL 2')
        await createBlog(page, 'Test Title 3', 'Test Author 2', 'Test URL 3')
      })

      test('likes can be increased', async ({ page }) => {
        const secondBlog = await likeBlog(page, 'Test Title 2', 1)
        await expect(secondBlog.getByText('likes 1')).toBeVisible()
        const thirdBlog = await likeBlog(page, 'Test Title 3', 2)
        await expect(thirdBlog.getByText('likes 2')).toBeVisible()
      })

      test('a blog can be removed', async ({ page }) => {
        const secondBlog = page.getByText('Test Title 2').locator('..')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        page.once('dialog', dialog => dialog.accept())
        await secondBlog.getByRole('button', { name: 'remove' }).click()
        await expect(secondBlog).not.toBeVisible()
      })

      test('blog remove button only shows for the creator', async ({ page }) => {
        var secondBlog = page.getByText('Test Title 2').locator('..')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        await expect(secondBlog.getByRole('button', { name: 'remove' })).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'user2', 'password2')
        var secondBlog = page.getByText('Test Title 2').locator('..')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        await expect(secondBlog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are sorted by likes', async ({ page }) => {
        await likeBlog(page, 'Test Title 1', 5)
        await likeBlog(page, 'Test Title 2', 2)
        await likeBlog(page, 'Test Title 3', 3)


        const blogElements = await page.locator('.blog').all()
        const likeCounts = await Promise.all(
          blogElements.map(async (blog) => {
            const text = await blog.innerText()
            const match = text.match(/likes\s+(\d+)/)
            return match ? parseInt(match[1]) : 0;
          })
        )
        const sortedLikes = [...likeCounts].sort((a, b) => b - a)
        expect(likeCounts).toEqual(sortedLikes)
      })
    })
  })
})


