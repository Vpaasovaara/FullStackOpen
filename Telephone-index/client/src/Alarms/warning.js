import React from 'react'


const Warning = ({ warning }) => (
  <div
    className={`alert alert-danger my-3 ${warning ? 'alert-shown' : 'alert-hidden'}`}
    //onTransitionEnd={() => setWarning(false)}
    role="alert">
        Telephone number deleted
  </div>
)
/*
Warning.propTypes = {
  error: PropTypes.bool
}
*/
export default Warning