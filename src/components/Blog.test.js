import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {

  let component
  const getUser = jest.fn(() => '')
  const likeBlog = jest.fn()

  beforeEach(() => {
    const testBlog = {
      title: 'Test',
      author: 'Author',
      url: 'http://url.test',
      likes: 10,
      user : { name: 'Test User' }
    }
    component = render(
      <Blog
        blog={testBlog}
        getUser={getUser}
        likeBlog={likeBlog}
      />
    )
  })

  test('renders title and author at start', () => {

    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('Test by Author')
    expect(component.container.querySelector('.blog'))
      .not.toHaveTextContent('url: http://url.test')
    expect(component.container.querySelector('.blog'))
      .not.toHaveTextContent('likes: 10')
    expect(component.container.querySelector('.blog'))
      .not.toHaveTextContent('user: Test User')

  })

  test('renders url, likes and user when view is clicked', () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('Test by Author')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('url: http://url.test')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('likes: 10')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('user: Test User')

  })

  test('when like is clicked twice, likeBlog is called twice', () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls.length).toBe(2)

  })

})

describe('Remove button', () => {

  test('is displayed when user is the same as the user who added the blog', () => {
    const testBlog = {
      title: 'Test',
      author: 'Author',
      url: 'http://url.test',
      likes: 10,
      user : { name: 'Test User' , username: 'testuser' }
    }
    const getUser = jest.fn(() => {
      const user = { name: 'Test User' , username: 'testuser' }
      return user
    })

    const component = render(
      <Blog
        blog={testBlog}
        getUser={getUser}
      />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    expect(component.queryByText('remove')).toBeInTheDocument()

  })

  test('is not displayed when user is not the same as the user who added the blog', () => {
    const testBlog = {
      title: 'Test',
      author: 'Author',
      url: 'http://url.test',
      likes: 10,
      user : { name: 'Test User' , username: 'testuser' }
    }
    const getUser = jest.fn(() => {
      const user = { name: 'Another User' , username: 'anotheruser' }
      return user
    })

    const component = render(
      <Blog
        blog={testBlog}
        getUser={getUser}
      />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    expect(component.queryByText('remove')).not.toBeInTheDocument()

  })

  test('calls removeBlog when clicked', () => {
    const testBlog = {
      title: 'Test',
      author: 'Author',
      url: 'http://url.test',
      likes: 10,
      user : { name: 'Test User' , username: 'testuser' },
      id: 'abc'
    }
    const getUser = jest.fn(() => {
      const user = { name: 'Test User' , username: 'testuser' }
      return user
    })

    const removeBlog = jest.fn()
    window.confirm = jest.fn(() => true)

    const component = render(
      <Blog
        blog={testBlog}
        getUser={getUser}
        removeBlog={removeBlog}
      />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const removeButton = component.queryByText('remove')
    fireEvent.click(removeButton)
    expect(removeBlog.mock.calls.length).toBe(1)
    expect(removeBlog.mock.calls[0][0]).toBe('abc')

  })

})