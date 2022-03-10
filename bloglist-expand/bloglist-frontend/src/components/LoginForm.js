import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { notificationOn } from '../reducers/notificationReducers'
import { loginApp } from '../reducers/loginReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { changeState } from '../reducers/stateReducer'


const LoginForm = (props) => {
  const dispatch = useDispatch()
  const { reset: usernameReset, ...username } = useField('text', 'Username')
  const { reset: passwordReset, ...password } = useField('password', 'Password')

  const handleLogin = async(e) => {
    e.preventDefault()
    let authors = props.users.map(x => x.username)
    if (authors.indexOf(username.value) === -1) {
      dispatch(notificationOn(`username ${username.value} doesn't exist`, 'danger', 5)) // 1. content 2. type 3. time/secs
    } else {
      try {
        const r = await loginService.login({
          username: username.value, password: password.value
        })
        blogService.setToken(r.token)
        dispatch(loginApp(r))
        loginToAccount()
      } catch (exception) {
        dispatch(notificationOn('Login failed, wrong password', 'danger', 5)) // 1. content 2. type 3. time/secs
        usernameReset()
        passwordReset()
      }
    }
  }

  const createAccount = () => {
    const content = { ...props.render }
    content.loginVisible = !content.loginVisible
    content.createUserVisible = !content.createUserVisible
    dispatch(changeState(content))
  }

  const loginToAccount = () => {
    const content = { ...props.render }
    content.loginVisible = !content.loginVisible
    content.loggedInVisible = !content.loggedInVisible
    dispatch(changeState(content))
  }

  return (
    <div>
      <form className="container" onSubmit={handleLogin}>
        <div className="row my-3">
          <h2>log in to application</h2>
          <label htmlFor='username'></label>
          <input name="username" {...username} required/>
        </div>
        <div className="row my-3">
          <label htmlFor='password'></label>
          <input name="password" {...password} required/>
        </div>
        <div>
          <input
            className="btn btn-primary"
            type="submit"
            name="login"
            value="login"
          />
          <button
            type='button'
            className="btn btn-success mx-3"
            onClick={() => createAccount()}>
              Create account
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    render: state.render
  }
}
const mapped = connect(mapStateToProps)(LoginForm)

export default mapped