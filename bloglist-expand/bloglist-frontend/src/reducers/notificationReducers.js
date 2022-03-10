const notificationReducer = (state = 'This is a notification', action) => {
  switch (action.type) {
  case 'NOTIFICATION_SET':
    return action.notification
  case 'NOTIFICATION_FADE':
    return action.notification
  default:
    return state
  }
}

export const notificationOn = (content, type, time) => {
  return dispatch => {
    dispatch(notificationSet(content, type))
    gee_timer = setTimeout(() => {
      dispatch(notificationFade())
    }, time * 1000)
  }
}

var gee_timer

const notificationSet = (content, type) => {
  clearTimeout(gee_timer)
  return ({
    type: 'NOTIFICATION_SET',
    notification: {
      content: `${content}`,
      visible: true,
      type: `${type}`
    }
  })
}
const notificationFade = () => {
  return ({
    type: 'NOTIFICATION_FADE',
    notification: {
      visible: false
    }
  })
}



export default notificationReducer