import React from 'react'


const Login = ({ setLogInVisible, setCreateVisible }) => (
  <div className="container my-3">
    <button
      className="btn btn-primary"
      onClick={() => setLogInVisible(true)}>
            Login
    </button>
    <button
      className="btn btn-success mx-3"
      onClick={() => setCreateVisible(true)}>
            Create account
    </button>
  </div>
)

export default Login