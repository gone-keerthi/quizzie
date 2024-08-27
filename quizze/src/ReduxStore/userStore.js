import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Actions/UserSlice';
import quizReducer from '../Actions/quizSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
  // getDefaultMiddleware includes redux-thunk by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export default store;

