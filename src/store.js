import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import blogListReducer from './reducers/blogListReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import singleUserReducer from './reducers/singleUserReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogListReducer,
  currentBlog: blogReducer,
  currentUser: loginReducer,
  users: userReducer,
  singleUser: singleUserReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)

)

export default store