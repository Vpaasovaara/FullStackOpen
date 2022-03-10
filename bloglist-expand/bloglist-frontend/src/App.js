import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateUser from './components/CreateUser'
import UserBlogs from './components/UserBlogs'
import UserList from './components/UserList'
import Buttons from './components/Buttons'
import Notification from './Alarms/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginFetch } from './reducers/loginReducer'
import BlogView from './components/BlogView'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const render = useSelector(state => state.render)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(loginFetch(loggedUserJSON))
    }
  }, [])

  return (
    <div>
      {render.loginVisible === true
        ? <LoginForm />
        : render.createUserVisible === true
          ? <CreateUser/>
          : render.loggedInVisible === true
            ? <BlogForm/> : null
      }
      <button onClick={() => {
        console.log('render', render)
        console.log('user', user)
        console.log('blogs', blogs)
        console.log('users', users)
      }}>test</button>
      {notification.visible ? <div className='container'><Notification /></div> : ''}
      <Routes>
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UserBlogs />} />
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<BlogView />} />
      </Routes>
      <Buttons />
    </div>
  )
}

export default App
