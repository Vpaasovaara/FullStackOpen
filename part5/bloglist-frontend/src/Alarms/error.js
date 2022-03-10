import React from 'react'


const Error = ({ error, message }) => (
  <div
    className={`alert alert-danger my-3 ${error ? 'alert-shown' : 'alert-hidden'}`}
    role="alert">
    {message}
  </div>
)

export default Error