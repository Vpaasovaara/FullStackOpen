import React from 'react'


const Success = ({ success, message }) => (
  <div
    className={`alert alert-success my-3 ${success ? 'alert-shown' : 'alert-hidden'}`}
    role="alert">
    {message}
  </div>
)

export default Success