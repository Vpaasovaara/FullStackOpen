import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'



test('BlogForm updates and calls on submit', () => {
  
  const title = 'testi blogi'
  const url = 'this is my url'
  const user = { username: 'testaaja' }

  const handleLogout = jest.fn()
  const setTitle = jest.fn()
  const addBlog = jest.fn()
  const setUrl = jest.fn()

  const component = render(
    <BlogForm
      addBlog={addBlog}
      title={title}
      setTitle={setTitle}
      url={url}
      setUrl={setUrl}
      handleLogout={handleLogout}
      user={user}/>
  )
  
  
  const create = component.container.querySelector('#blogCreate')
  userEvent.click(create)

  const submitForm = component.container.querySelector('#submitForm')
  fireEvent.submit(submitForm)
  const inputTitle = component.container.querySelector('#inputTitle')

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(inputTitle.value).toBe(title)
})