import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { add } from '../reducers/blogReducer'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

jest.mock('../reducers/blogReducer', () => ({
  add: jest.fn()
}))

afterAll(() => {
  jest.clearAllMocks()
})

test('<BlogForm/> calls addblog when form is submitted', () => {

  const component = render(
    <BlogForm/>
  )

  const titleInput = component.container.querySelector('#title')
  fireEvent.change(titleInput, {
    target: { value: 'Title' }
  })
  const authorInput = component.container.querySelector('#author')
  fireEvent.change(authorInput, {
    target: { value: 'Author' }
  })
  const urlInput = component.container.querySelector('#url')
  fireEvent.change(urlInput, {
    target: { value: 'http://test.url' }
  })
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(add.mock.calls.length).toBe(1)
  expect(add.mock.calls[0][0].title).toBe('Title')
  expect(add.mock.calls[0][0].author).toBe('Author')
  expect(add.mock.calls[0][0].url).toBe('http://test.url')

})


