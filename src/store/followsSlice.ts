import { createSlice } from '@reduxjs/toolkit';

type Follows = {
  authorId: string;
  followedUserId: string;
};

const initialState = {
  follows: [],
};

const followsSlice = createSlice({
  name: 'follows',
  initialState,
  reducers: {},
});

export default followsSlice;
