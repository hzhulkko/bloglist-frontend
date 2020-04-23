import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'
import Blog from './Blog'
import { getOne, like } from '../reducers/blogReducer'
import { remove } from '../reducers/blogListReducer'

const mockDispatch = jest.fn()
const mockHistory = jest.fn()

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useRouteMatch: jest.fn(),
  useHistory: () => ({
    push: mockHistory
  }),
}))

jest.mock('../reducers/blogReducer', () => ({
  getOne: jest.fn(),
  like: jest.fn()
}))

jest.mock('../reducers/blogListReducer', () => ({
  remove: jest.fn()
}))

// Mock child components

jest.mock('./CommentForm', () => () => (<div>Comment form mock</div>))
jest.mock('./Comments', () => () => (<h3>Comments</h3>))


describe('<Blog/>', () => {

  let component

  const testBlog = {
    title: 'Test',
    author: 'Author',
    url: 'http://url.test',
    likes: 10,
    user : { name: 'Test User' },
    id: 1
  }

  beforeEach(() => {
    useSelector.mockImplementation(() => {
      return testBlog
    })
    useParams.mockImplementation(() => {
      return { id: 1 }
    })
    useRouteMatch.mockImplementation(() => {
      return { params : { id: 1 } }
    })
    component = render(<Blog />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders title, author, url and likes', () => {

    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('Test by Author')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('url: http://url.test')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('likes: 10')
    expect(component.container.querySelector('.blog'))
      .toHaveTextContent('user: Test User')

  })

  test('when like is clicked twice, like is called twice', () => {

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(like.mock.calls.length).toBe(2)

  })
})

describe('Remove button', () => {

  beforeEach(() => {
    useParams.mockImplementation(() => {
      return { id: 1 }
    })
    useRouteMatch.mockImplementation(() => {
      return { params : { id: 1 } }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('is displayed when user is the same as the user who added the blog', () => {

    const mockState = {
      currentBlog:
        {
          title: 'Test',
          author: 'Author',
          url: 'http://url.test',
          likes: 10,
          user : { name: 'Test User' , username: 'testuser' },
          id: 1
        },
      currentUser : { name: 'Test User' , username: 'testuser' }
    }

    useSelector.mockImplementation(callback => {
      return callback(mockState)
    })

    const component = render(
      <Blog/>
    )

    expect(component.queryByText('remove')).toBeInTheDocument()

  })

  test('is not displayed when user is not the same as the user who added the blog', () => {

    const mockState = {
      currentBlog:
        {
          title: 'Test',
          author: 'Author',
          url: 'http://url.test',
          likes: 10,
          user : { name: 'Test User' , username: 'testuser' },
          id: 1
        },
      currentUser : { name: 'Another User' , username: 'anotheruser' }
    }

    useSelector.mockImplementation(callback => {
      return callback(mockState)
    })

    const component = render(
      <Blog/>
    )

    expect(component.queryByText('remove')).not.toBeInTheDocument()

  })

  test('when clicked calls remove and redirects to /', () => {

    const mockState = {
      currentBlog:
        {
          title: 'Test',
          author: 'Author',
          url: 'http://url.test',
          likes: 10,
          user : { name: 'Test User' , username: 'testuser' },
          id: 1
        },
      currentUser : { name: 'Test User' , username: 'testuser' }
    }

    window.confirm = jest.fn(() => true)

    useSelector.mockImplementation(callback => {
      return callback(mockState)
    })

    const component = render(
      <Blog/>
    )
    const removeButton = component.queryByText('remove')
    fireEvent.click(removeButton)
    expect(remove.mock.calls.length).toBe(1)
    // called with parameter id
    expect(remove.mock.calls[0][0]).toBe(1)
    expect(mockHistory.mock.calls.length).toBe(1)
    expect(mockHistory.mock.calls[0][0]).toBe('/')


  })

})