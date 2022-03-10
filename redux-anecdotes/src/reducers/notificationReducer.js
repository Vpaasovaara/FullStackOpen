


// 6.10 anekdootit, step8
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

// 6.18 anekdootit ja backend, step6
export const notificationOn = (content, time) => {
    return dispatch => {
        dispatch(notificationSet(content))
        gee_timer = setTimeout(() => {
            dispatch(notificationFade())
        }, time * 1000)
    }
}

// 6.21 anekdootit, loppuhuipennus
var gee_timer

const notificationSet = (content) => {
    clearTimeout(gee_timer)
    return ({
        type: 'NOTIFICATION_SET',
        notification: { 
            content: `${content}`,
            visible: true
        }
    })
}
const notificationFade = (time) => {
    return ({
        type: 'NOTIFICATION_FADE',
        notification: {
            visible: false
            }
        })
}



export default notificationReducer