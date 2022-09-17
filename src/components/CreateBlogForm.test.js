import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('the event handler is called with the right details', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render(
    <CreateBlogForm
      createBlog={mockCreateBlog}
    />
  )

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('url')

  await user.type(title, 'New Title')
  await user.type(author, 'New Author')
  await user.type(url, 'newurl')

  const saveButton = screen.getByText('save')

  await user.click(saveButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('New Title')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('New Author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('newurl')
})