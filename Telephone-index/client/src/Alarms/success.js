import React from 'react'


const Success = ({ success }) => (
  <div
    className={`alert alert-success my-3 ${success ? 'alert-shown' : 'alert-hidden'}`}
    //onTransitionEnd={() => setSuccess(false)}
    role="alert">
        Telephone number succesfully added!
  </div>
)
/*
Success.propTypes = {
  error: PropTypes.bool
}
*/
export default Success