import { combineReducers } from 'redux';

import count from './count/countSlice';
import user from './user/userSlice';
import post from './post/postSlice';

const reducers = combineReducers({
  count,
  user,
  post,
});

export default reducers;
