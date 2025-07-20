import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'
import { exact, func } from 'prop-types'

describe('<Blog />', () => {
  const user = {
    username: 'myUsername',
  }

  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog URL',
    likes: 0,
    user: user,
  }

  test('only renders title and author when unexpanded', async () => {
    render(<Blog blog={blog} onLike={func} user={user} onDelete={func} />)
    const url = screen.queryByText('Blog Author')
    const likes = screen.queryByText('likes', { exact: false })

    expect(url.closest('div')).toHaveStyle('display: none')
    expect(likes.closest('div')).toHaveStyle('display: none')
  })

  test('renders url and number of likes after button click', async () => {
    render(
      <Blog blog={blog} onLike={() => null} user={user} onDelete={() => null} />
    )
    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    await testUser.click(button)

    const url = screen.queryByText('Blog Author')
    const likes = screen.queryByText('likes', { exact: false })

    expect(url).not.toHaveStyle('display: none')
    expect(likes).not.toHaveStyle('display: none')
  })

  test('like button clicked twice', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        onLike={mockHandler}
        user={user}
        onDelete={() => null}
      />
    )
    const testUser = userEvent.setup()
    const viewButton = screen.queryByText('view')
    await testUser.click(viewButton)

    const likeButton = screen.queryByText('like')
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
