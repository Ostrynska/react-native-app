import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    nickname: null,
    email: null,
    userPhoto: null,
    stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserAvatar: (state, {payload}) => ({
      ...state,
      userPhoto: payload.userPhoto,
    }),
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      userPhoto: payload.userPhoto,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authSignOut, updateUserAvatar } =
  authSlice.actions;
export const authReducer = authSlice.reducer;