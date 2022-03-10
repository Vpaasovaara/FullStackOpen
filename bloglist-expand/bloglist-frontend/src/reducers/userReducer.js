import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'USER_ADD':
    return action.content
  case 'USER_GET':
    return action.content
  case 'USER_INIT':
    return action.content
  default:
    return state
  }
}

export const createUser = (content, userList) => {
  if (userList.some(x => x.username === content.username)) {
    throw ''
  } else {
    return async dispatch => {
      await userService.create(content)
      const users = await userService.getAll()
      dispatch({
        type: 'USER_ADD',
        content: users
      })
    }
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USER_INIT',
      content: users
    })
  }
}

export default userReducer