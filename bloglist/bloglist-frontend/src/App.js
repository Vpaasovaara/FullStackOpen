import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import CreateUser from './components/CreateUser'
import Login from './components/login'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import Error from './Alarms/error'
import Success from './Alarms/success'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [logInVisible, setLogInVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    usersService.getAll().then(users =>
      setUsers( users ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
    let authors = users.map(x => x.username)
    if (authors.indexOf(username) === -1) {
      setErrorMessage(`username ${username} doesn't exist`)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    } else {
      try {
        const r = await loginService.login({
          username: username, password: password
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(r)
        )
        blogService.setToken(r.token)
        setUser(r)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Login failed, wrong username or password')
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 5000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const addBlog = async(e) => {
    e.preventDefault()
    let currentUser = (users.filter(u => u.username === user.username))[0]
    console.log(currentUser)
    let newBlog =  {
      title: title,
      author: user.username,
      url: url,
      userID: currentUser.id
    }
    try {
      await blogService.create(newBlog)
      setSuccessMessage(`added new blog: ${title}, by: ${user.username}`)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
      setTitle('')
      setUrl('')
      window.location.reload()
    } catch (exception) {
      setErrorMessage('Failed to add new blog')
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  const addLike = async(id) => {
    let index = blogs.map(x => x.id).indexOf(id)
    console.log('index', index)
    let newBlog = [...blogs][index]
    console.log(newBlog)

    newBlog.likes++
    try {
      let res = await blogService.update(id, newBlog)
      setBlogs(res)
    } catch (exception) {
      setErrorMessage('Failed to update')
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  const sortByLikes = () => {
    let blogsCopy = [...blogs]
    let sorted = blogsCopy.sort((a, b) => {
      return b.likes - a.likes
    })
    console.log(sorted)
    setBlogs(sorted)
  }

  const deleteBlog = async(id) => {
    let copyBlogs = [...blogs]
    let newBlog = copyBlogs.filter(blog => blog.id === id)
    console.log('newBlog', newBlog[0])
    try {
      if (window.confirm(`do you want to delete blog ${newBlog[0].title} by ${newBlog[0].author}`)) {
        await blogService.destroy(id)
        window.location.reload()
      }
    } catch (exception) {
      setErrorMessage('You are not authorized to delete this blog')
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null && logInVisible === true
        ? <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          username={username}
          setPassword={setPassword}
          password={password}
          setLogInVisible={setLogInVisible}/>
        : user === null && logInVisible === false && createVisible === false
          ? <Login
            setLogInVisible={setLogInVisible}
            setCreateVisible={setCreateVisible}/>
          : user === null && createVisible === true
            ? <CreateUser
              setCreateVisible={setCreateVisible}
              setSuccess={setSuccess}
              setSuccessMessage={setSuccessMessage}
              setError={setError}
              setErrorMessage={setErrorMessage}
              setUsers={setUsers}/>
            : <BlogForm
              addBlog={addBlog}
              title={title}
              setTitle={setTitle}
              url={url}
              setUrl={setUrl}
              handleLogout={handleLogout}
              user={user}/>
      }
      <div className='container'>
        {error ? <Error error={error} message={errorMessage}/>
          : success
            ? <Success success={success} message={successMessage} />
            : null}
      </div>
      <div className='container my-3'>
        <h2>blogs</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Author</th>
              <th scope='col'>Info</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}/>
            )}
          </tbody>
        </table>
      </div>
      <div className='container'>
        <button
          onClick={() => sortByLikes()}>
          Sort by likes
        </button>
      </div>
    </div>
  )
}

App.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  blogs: PropTypes.array,
  user: PropTypes.object,
  users: PropTypes.array,
  username: PropTypes.string,
  password: PropTypes.string,
  title : PropTypes.string,
  url : PropTypes.string,
  error : PropTypes.bool,
  success: PropTypes.bool,
  logInVisible: PropTypes.bool,
  createVisible: PropTypes.bool
}


export default App