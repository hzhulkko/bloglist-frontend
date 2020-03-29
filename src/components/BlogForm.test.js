import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm/> calls addblog when form is submitted', () => {

  const addBlog = jest.fn()

  const component = render(
    <BlogForm
      addblog={addBlog}
    />
  )

  const titleInput = component.container.querySelector('#title')
  fireEvent.change(titleInput, {
    target: { value: 'Title' }
  })
  const authorInput = component.container.querySelector('#title')
  fireEvent.change(authorInput, {
    target: { value: 'Author' }
  })
  const urlInput = component.container.querySelector('#title')
  fireEvent.change(urlInput, {
    target: { value: 'http://test.url' }
  })
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(addBlog.mock.calls.length).toBe(1)

})


