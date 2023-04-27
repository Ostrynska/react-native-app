import { createSlice } from '@reduxjs/toolkit';

import { addPost, getAllPosts, getOwnPosts, getPostCommnets } from "./postsOperations";

const initialState = {
  items: [],
  allItems: [],
  comments: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getOwnPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOwnPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getOwnPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAllPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allItems = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPostCommnets.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPostCommnets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getPostCommnets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const postsReducer = postsSlice.reducer;
