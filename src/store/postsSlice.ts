import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPost, getAllPosts } from '../api/posts';
import RequestStatus from '../constants/requestStatus';
import { InitialPost, Post } from '../types/post';
import type { RootState } from './store';

type InitialState = {
  posts: Post[];
  status: RequestStatus;
  error?: string;
  isEdit: boolean;
};

const initialState: InitialState = {
  posts: [],
  status: RequestStatus.Idle,
  isEdit: false,
};

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (data: InitialPost) => {
    const post = await createPost(data);
    return post;
  }
);

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    const posts = await getAllPosts();
    return posts;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleEditPosts(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = RequestStatus.Resolved;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = RequestStatus.Pending;
      });
  },
});

export const { toggleEditPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: string) =>
  state.posts.posts.find((post) => post.id === id);

export default postsSlice.reducer;
