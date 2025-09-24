import { combineReducers } from 'redux';
import { USERS_FEATURE_KEY, usersReducer } from './users.slice';

export const ADMIN_FEATURE_KEY = 'admin';

export const adminReducer = combineReducers({
  [USERS_FEATURE_KEY]: usersReducer,
});
