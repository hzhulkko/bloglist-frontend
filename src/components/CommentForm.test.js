import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { addComment } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

jest.mock('../reducers/blogReducer', () => ({
  addComment: jest.fn()
}))

afterAll(() => {
  jest.clearAllMocks()
})

test('<CommentForm/> calls addComment on submit', () => {
  const id = 'abc'
  const component = render(
    <CommentForm id={id}/>
  )

  const input = component.container.querySelector('#comment')
  fireEvent.change(input, { target: { value: 'Just testing' } })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(addComment.mock.calls.length).toBe(1)
  expect(addComment.mock.calls[0][0]).toBe('abc')
  expect(addComment.mock.calls[0][1].comment).toBe('Just testing')
  expect(input.value).toBe('')
})

