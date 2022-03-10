import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {

  return (
    <div
      className={`alert alert-${props.type} my-3
      ${props.visible ? 'alert-shown' : 'alert-hidden'}`}
      role="alert">
      {props.content}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    visible: state.notification.visible,
    content: state.notification.content,
    type: state.notification.type
  }
}

const mapped = connect(mapStateToProps)(Notification)
export default mapped
