import React from 'react'

const LoginForm = (props) => (
  <form className="container" onSubmit={props.handleLogin}>
    <div className="row my-3">
      <h2>log in to application</h2>
      <label htmlFor='username'></label>
      <input
        placeholder="username"
        id="username"
        type="text"
        name="username"
        value={props.username}
        onChange={({ target }) =>
          props.setUsername(target.value)}
        required/>
    </div>
    <div className="row my-3">
      <label htmlFor='password'></label>
      <input
        placeholder="password"
        id="password"
        type="password"
        value={props.password}
        name="password"
        onChange={({ target }) =>
          props.setPassword(target.value)}
        required/>
    </div>
    <div>
      <input
        className="btn btn-primary"
        type="submit"
        name="login"
        value="login"
      />
      <button
        className="btn btn-danger col mx-3"
        onClick={() => props.setLogInVisible(false)}>
          Cancel
      </button>
    </div>
  </form>
)

export default LoginForm