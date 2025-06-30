import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'
import { func } from 'prop-types'


describe('<Blog />', () => {
  const user = {
    username: 'myUsername'
  }

  test('renders content', async () => {

    const blog = {
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'Blog URL',
      likes: 0,
      user: user
    }

    const mockHandler = vi.fn()
    render(<Blog blog={blog} onLike={mockHandler} user={user} onDelete={() => null}/>)
    const testUser = userEvent.setup()
    const button = screen.getByText('like')
    await testUser.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)

    const element = await screen.findByText('Blog Title')
    expect(element).toBeDefined()
  })

  test('does not render this', () => {
    const blog = {
      content: 'do not show this',
      author: 'uknown',
      url: '',
      user: user
    }

    render(<Blog blog={blog} user={user} />)

    const element = screen.queryByText('do not show this')
    expect(element).toBeNull()
  })

  test('only renders title and author when unexpanded', async () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'Blog URL',
      likes: 0,
      user: user
    }

    render(<Blog blog={blog} onLike={func} user={user} onDelete={() => null}/>)
    const url = screen.queryByText('Blog Author')
    const title = screen.queryByText('Blog URL')

    expect(url.parentElement).toHaveStyle('display: none')
    expect(title.parentElement).toHaveStyle('display: none')
  })
})