//import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN_SET':
    return action.content
  case 'LOGIN_FETCH':
    return action.content
  case 'LOGOUT':
    return action.content
  default:
    return state
  }
}

export const loginApp = (content) => {
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(content)
  )
  return async dispatch => {
    dispatch({
      type: 'LOGIN_SET',
      content: content
    })
  }
}

export const loginFetch = (loggedUserJSON) => {
  return dispatch => {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_FETCH',
      content: user
    })
  }
}

export const logoutApp = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT',
      content: {}
    })
  }
}

export default loginReducer