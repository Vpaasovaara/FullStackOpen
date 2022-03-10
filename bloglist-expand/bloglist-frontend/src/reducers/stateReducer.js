
const stateReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_STATE':
    return action.content
  default:
    return state
  }
}

export const changeState = (content) => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_STATE',
      content: content
    })
  }
}

const initialState = {
  loginVisible: true,
  loggedInVisible: false,
  createUserVisible: false
}


export default stateReducer