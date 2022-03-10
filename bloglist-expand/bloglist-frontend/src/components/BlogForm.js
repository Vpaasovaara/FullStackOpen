import React from 'react'
import { notificationOn } from '../reducers/notificationReducers'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { logoutApp } from '../reducers/loginReducer'
import { changeState } from '../reducers/stateReducer'

const BlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text', 'Title')
  const { reset: resetUrl, ...url } = useField('text', 'Url')
  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    dispatch(createBlog({ title: title.value, url: url.value }, props.users)) // 1. {title, url} 2. users
    try {
      dispatch(notificationOn(`added new blog: ${title.value}, by: ${props.username}`, 'success', 5)) // 1. content 2. type 3. time/secs
      resetAll()
    } catch (exception) {
      dispatch(notificationOn('Failed to add new blog', 'danger', 5)) // 1. content 2. type 3. time/secs
    }
  }
  const resetAll = () => {
    resetTitle()
    resetUrl()
  }
  const handleLogout = () => {
    dispatch(logoutApp())
    const content = { ...props.render }
    content.loginVisible = !content.loginVisible
    content.loggedInVisible = !content.loggedInVisible
    content.blogsByUserVisible = false
    content.blogListVisible = true
    dispatch(changeState(content))
  }


  return (
    <div>
      <form className="container" id="submitForm" onSubmit={addBlog}>
        <div className="row my-3">{props.username} logged in</div>
        <h2 className="row my-3">Add your new blog here</h2>
        <div className="row my-3">
          <input {...title}/>
        </div>
        <div className="row my-3">
          <input {...url}/>
        </div>
        <div className="row">
          <button className="btn btn-primary col" type="submit">save</button>
          <div className="col-9"></div>
        </div>
      </form>
      <div className='container my-3'>
        <div className='row'>
          <button className="btn btn-danger col" onClick={() => handleLogout()}>Logout</button>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    users: state.users,
    render: state.render
  }
}
const mapped = connect(mapStateToProps)(BlogForm)

export default mapped