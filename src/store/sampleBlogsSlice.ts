import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState = {
  blogs: [
    {
      blogTitle: 'Blog card #1',
      blogCoverPhoto: 'stock-1',
      blogDate: 'May 1, 2021',
    },
    {
      blogTitle: 'Blog card #2',
      blogCoverPhoto: 'stock-2',
      blogDate: 'May 1, 2021',
    },
    {
      blogTitle: 'Blog card #3',
      blogCoverPhoto: 'stock-3',
      blogDate: 'May 1, 2021',
    },
    {
      blogTitle: 'Blog card #4',
      blogCoverPhoto: 'stock-4',
      blogDate: 'May 1, 2021',
    },
  ],
  isEdit: false,
};

export const sampleBlogsSlice = createSlice({
  name: 'sampleBlogs',
  initialState,
  reducers: {
    toggleEditPost(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
  },
});

export const { toggleEditPost } = sampleBlogsSlice.actions;

export const selectSampleBlogs = (state: RootState) => state.sampleBlogs;

export default sampleBlogsSlice.reducer;
