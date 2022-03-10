import React from 'react'


const Info = ({ info }) => (
  <div
    className={`alert alert-primary my-3 ${info ? 'alert-shown' : 'alert-hidden'}`}
    //onTransitionEnd={() => setInfo(false)}
    role="alert">
        Telephone number changed
  </div>
)
/*
Info.propTypes = {
  error: PropTypes.bool
}
*/
export default Info