import React from 'react'


const Error = ({ error }) => (
  <div
    className={`alert alert-danger my-3 ${error ? 'alert-shown' : 'alert-hidden'}`}
    //onTransitionEnd={() => setWarning(false)}
    role="alert">
        Telephone number have already been deleted
  </div>
)
/*
Error.propTypes = {
  error: PropTypes.bool
}
*/
export default Error