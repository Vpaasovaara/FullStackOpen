import React from 'react';
import { connect } from 'react-redux';


// 6.10 anekdootit, step8
const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
} 

  return (
    <div>
      {props.visible ? 
      <div style={style}>
        {props.content}
      </div> 
      : ""}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visible: state.notification.visible,
    content: state.notification.content
  }
}

const mapped = connect(mapStateToProps)(Notification)
export default mapped