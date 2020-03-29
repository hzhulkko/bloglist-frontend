import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

test('<LoginForm/> calls login when form is submitted', () => {

  const login = jest.fn()

  const component = render(
    <LoginForm
      login={login}
    />
  )

  const usernameInput = component.container.querySelector('#username')
  fireEvent.change(usernameInput, {
    target: { value: 'Username' }
  })
  const passwordInput = component.container.querySelector('#password')
  fireEvent.change(passwordInput, {
    target: { value: 'Password' }
  })
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(login.mock.calls.length).toBe(1)
  expect(login.mock.calls[0][0]).toBe('Username' )
  expect(login.mock.calls[0][1]).toBe('Password' )

})