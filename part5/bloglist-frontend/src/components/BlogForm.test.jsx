import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog URL',
  }

  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const handleCreate = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreate={handleCreate} />)

    const input = screen.getByPlaceholderText('write title here')
    const sendButton = screen.getByText('create')

    await user.type(input, 'Blog Title')
    await user.click(sendButton)

    console.log(handleCreate.mock.calls)
    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0].title).toBe('Blog Title')
  })

  test('BlogForm passes props correctly', async () => {
    const handleCreate = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreate={handleCreate} />)

    const input = screen.getByPlaceholderText('write title here')
    await user.type(input, blog.title)
    const author = screen.getByPlaceholderText('write author here')
    await user.type(author, blog.author)
    const url = screen.getByPlaceholderText('write url here')
    await user.type(url, blog.url)
    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0]).toEqual(blog)
  })
})