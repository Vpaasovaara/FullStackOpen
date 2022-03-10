import React, { useState } from 'react'
import usersService from '../services/users'

const CreateUser = (props) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCreate = async(e) => {
    e.preventDefault()
    let newUser = {
      username: username,
      password: password,
      name: name
    }
    try {
      const r = await usersService.create(newUser)
      console.log(r)
      const an = await usersService.getAll()
      props.setUsers(an)
      props.setSuccessMessage(`added new user: ${username}`)
      props.setCreateVisible(false)
      //window.location.reload()
      props.setSuccess(true)
      setTimeout(() => {
        props.setSuccess(false)
      }, 5000)
    } catch (exception) {
      props.setErrorMessage('Username already exists')
      props.setError(true)
      setTimeout(() => {
        props.setError(false)
      }, 5000)
    }

  }

  return (
    <form className="container" onSubmit={handleCreate}>
      <div className="row my-3">
        <h2>Create new user</h2>
        <label htmlFor='name'></label>
        <input
          placeholder="name"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={({ target }) =>
            setName(target.value)}
          required/>
      </div>
      <div className="row my-3">
        <label htmlFor='username'></label>
        <input
          placeholder="username"
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) =>
            setUsername(target.value)}
          required/>
      </div>
      <div className="row my-3">
        <label htmlFor='password'></label>
        <input
          placeholder="password"
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) =>
            setPassword(target.value)}
          required/>
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
          onClick={() => props.setCreateVisible(false)}>
            Cancel
        </button>
      </div>
    </form>
  )
}

export default CreateUser