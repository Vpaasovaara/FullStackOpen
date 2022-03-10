import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, fireEvent } from '@testing-library/react'
// import { screen } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testiajo',
    author: 'testaaja',
    url: 'testaajanURL',
    likes: 0,
    userID: '61338cf20d71392181332b04'
  }

  const addLike = () => {
    blog.likes++
  }

  const deleteBlog = async() => {
    if (window.confirm(`do you want to delete blog ${blog.title} by ${blog.author}`)) {
      await blogService.destroy(blog.userID)
      window.location.reload()
    }
  }

  const component = render(
    <Blog 
      blog={blog}
      addLike={addLike}
      deleteBlog={deleteBlog}/>
  )
  
  expect(document.querySelector('.blog')).toBeInTheDocument()
  expect(component.container).toHaveTextContent(
    'testiajo'
  )
  expect(component.container).toHaveTextContent(
    'testaaja'
  )
})

test('Clicking show will expand the blog', async() => {
  const blog = {
    title: 'testiajo',
    author: 'testaaja',
    url: 'testaajanURL',
    likes: 0,
    userID: '61338cf20d71392181332b04'
  }
  const addLike = () => {
    blog.likes++
  }

  const deleteBlog = async() => {
    if (window.confirm(`do you want to delete blog ${blog.title} by ${blog.author}`)) {
      await blogService.destroy(blog.userID)
      window.location.reload()
    }
  }

  const component = render(
    <Blog 
      blog={blog}
      addLike={addLike}
      deleteBlog={deleteBlog}/>
  )
  
  const button = component.getByText('Show')
  userEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testaajanURL'
  )
})

test('Clicking like button twice calls the function two times', async() => {
    const blog = {
      title: 'testiajo',
      author: 'testaaja',
      url: 'testaajanURL',
      likes: 0,
      userID: '61338cf20d71392181332b04'
    }
  
    const deleteBlog = async() => {
      if (window.confirm(`do you want to delete blog ${blog.title} by ${blog.author}`)) {
        await blogService.destroy(blog.userID)
        window.location.reload()
      }
    }

    const mockHandler = jest.fn()
  
    const component = render(
      <Blog 
        blog={blog}
        addLike={mockHandler}
        deleteBlog={deleteBlog}/>
    )
    
    const show = component.getByText('Show')
    userEvent.click(show)

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
})