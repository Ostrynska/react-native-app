import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authReducer } from "./auth/authReducer";
// import { postsReduser } from "./posts/postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
//   posts: postsReduser,
});

export const store = configureStore({
  reducer: rootReducer,
});