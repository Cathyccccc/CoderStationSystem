import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import typeReducer from './typeSlice';
import interviewReducer from './interviewSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer,
    interview: interviewReducer,
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())