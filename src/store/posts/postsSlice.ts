import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RequestStatus from '../../constants/requestStatus';
import { Post } from '../../types/post';
import type { RootState } from '../store';
import { addNewPost, deletePost, fetchAllPosts, updatePost } from './thunks';

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
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        const existingPost = state.posts.find(
          (post) => post.id === action.payload.id
        );
        if (!existingPost) {
          throw new Error('somethign went wrong with post update');
        }
        state.posts[existingPostIndex] = {
          ...existingPost,
          body: action.payload.body,
          title: action.payload.title,
          coverImage: action.payload.coverImage,
        };
      });
  },
});

export const { toggleEditPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: string) =>
  state.posts.posts.find((post) => post.id === id);

export default postsSlice.reducer;
