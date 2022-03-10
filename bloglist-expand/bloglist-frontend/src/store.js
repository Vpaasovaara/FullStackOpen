import notificationReducer from './reducers/notificationReducers'
import blogReducer from './reducers/blogReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import stateReducer from './reducers/stateReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  login: loginReducer,
  render: stateReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store