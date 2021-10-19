import { combineReducers } from 'redux'

import count from './count/countSlice'
import user from './user/userSlice'

const reducers = combineReducers({ 
  count,user,
})

export default reducers;