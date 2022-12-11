import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPost } from '../api/posts';
import RequestStatus from '../constants/requestStatus';
import { InitialPost, Post } from '../types/post';

type InitialState = {
  posts: Post[];
  status: RequestStatus;
  error: string | null;
};

const initialState: InitialState = {
  posts: [],
  status: RequestStatus.Idle,
  error: null,
};

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (data: InitialPost) => {
    const post = await createPost(data);
    return post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // state.posts.push(action.payload);
    });
  },
});

export default postsSlice.reducer;
