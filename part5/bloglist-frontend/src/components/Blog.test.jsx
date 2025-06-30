import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'
import { exact, func } from 'prop-types'


describe('<Blog />', () => {
  const user = {
    username: 'myUsername'
  }

  test('only renders title and author when unexpanded', async () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'Blog URL',
      likes: 0,
      user: user
    }

    render(<Blog blog={blog} onLike={func} user={user} onDelete={func}/>)
    const url = screen.queryByText('Blog Author')
    const likes = screen.queryByText('likes', { exact: false })

    expect(url.closest('div')).toHaveStyle('display: none')
    expect(likes.closest('div')).toHaveStyle('display: none')
  })

  test('renders url and number of likes after button click', async () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'Blog URL',
      likes: 0,
      user: user
    }

    render(<Blog blog={blog} onLike={() => null} user={user} onDelete={() => null}/>)
    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    await testUser.click(button)

    const url = screen.queryByText('Blog Author')
    const likes = screen.queryByText('likes', { exact: false })

    expect(url).not.toHaveStyle('display: none')
    expect(likes).not.toHaveStyle('display: none')
  })

})