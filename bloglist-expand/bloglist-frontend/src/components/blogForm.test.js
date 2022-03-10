import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, fireEvent } from '@testing-library/react'
// import { screen } from '@testing-library/dom'
import BlogForm from './BlogForm'



test('BlogForm updates and calls on submit', () => {
  
  let matchBlog =  {
      title: 'testaaja blog',
      author: 'testaaja',
      url: 'jk',
      userID: '61338cf20d71392181332b04'
    }

  
  /*const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)*/

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
  
  //const inputTitle = component.container.querySelector('#inputTitle')
  //const urlTitle = component.container.querySelector('#urlTitle')
  const submitForm = component.container.querySelector('#submitForm')
  
  //console.log('inputTitle', inputTitle)
  //console.log('urlTitle', urlTitle)

  /*
  fireEvent.change(inputTitle, {
      target: { value: 'testi blogi' }
  })

  fireEvent.change(urlTitle, {
    target: { value: 'this is my url' }
  })*/

  fireEvent.submit(submitForm)


  console.log("mock call", addBlog.mock.calls[0][0])

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].content).toBe('testi blogi')
})