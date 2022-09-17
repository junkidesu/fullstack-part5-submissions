import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container
let mockDeleteHandler
let mockLikeHandler

beforeEach(() => {
  const blog = {
    id: 'id',
    title: 'Title',
    author: 'Author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name',
      username: 'username',
      id: 'id'
    }
  }
  mockDeleteHandler = jest.fn()
  mockLikeHandler = jest.fn()

  container = render(
    <Blog
      blog={blog}
      deleteBlog={mockDeleteHandler}
      likeBlog={mockLikeHandler}
      username='username'
    />
  ).container
})

describe('<Blog />', () => {
  test('at start only title and author are visible', () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Title Author')
    expect(div.querySelector('.blogDetails')).not.toBeVisible()
  })

  test('clicking view shows details', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogDetails')

    expect(div).toBeVisible()
  })

  test('if like button clicked twice, event handler called twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})