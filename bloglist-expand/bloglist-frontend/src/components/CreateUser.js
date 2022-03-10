import React from 'react'
import { notificationOn } from '../reducers/notificationReducers'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { changeState } from '../reducers/stateReducer'

const CreateUser = (props) => {
  const { reset: nameReset, ...name } = useField('text', 'Name')
  const { reset: usernameReset, ...username } = useField('text', 'Username')
  const { reset: passwordReset, ...password } = useField('password', 'Password')
  const dispatch = useDispatch()

  const handleCreate = async(e) => {
    e.preventDefault()
    try {
      dispatch(createUser({ username: username.value, password: password.value, name: name.value }, props.users))
      dispatch(notificationOn(`added new user: ${username.value}`, 'success', 5))
      cancelCreateUser()
    } catch (exception) {
      dispatch(notificationOn('Username already exists', 'danger', 5))
      resetAll()
    }
  }

  const resetAll = () => {
    nameReset()
    usernameReset()
    passwordReset()
  }

  const cancelCreateUser = () => {
    const content = { ...props.render }
    content.loginVisible = !content.loginVisible
    content.createUserVisible = !content.createUserVisible
    dispatch(changeState(content))
  }

  return (
    <form className="container" onSubmit={handleCreate}>
      <div className="row my-3">
        <h2>Create new user</h2>
        <label htmlFor='name'></label>
        <input name="name" {...name} required/>
      </div>
      <div className="row my-3">
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
          name="create"
          value="create"
        />
        <button
          className="btn btn-danger col mx-3"
          onClick={() => cancelCreateUser()}>
            Cancel
        </button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    render: state.render
  }
}
const mapped = connect(mapStateToProps)(CreateUser)

export default mapped