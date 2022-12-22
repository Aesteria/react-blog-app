import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import RequestStatus from '../constants/requestStatus';
import { db } from '../firebase';
import type { RootState } from './store';

type Follow = {
  author: string;
  follower: string;
  id: string;
};

type InitialState = {
  follows: Follow[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  follows: [],
  status: RequestStatus.Idle,
};

export const fetchFollows = createAsyncThunk(
  'follows/fetchFollows',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'follows'));
    const newData: Follow[] = [];
    querySnapshot.forEach((document) => {
      newData.push({
        id: document.id,
        author: document.data().author,
        follower: document.data().follower,
      });
    });

    return newData;
  }
);

const followsSlice = createSlice({
  name: 'follows',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFollows.fulfilled, (state, action) => {
        state.status = RequestStatus.Resolved;
        state.follows = action.payload;
      })
      .addCase(fetchFollows.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchFollows.pending, (state) => {
        state.status = RequestStatus.Pending;
      });
  },
});

export const selectFollowersByAuthorId = (state: RootState, authorId: string) =>
  state.follows.follows.filter((follow) => follow.author === authorId);

export const selectFollowingByAuthorId = (state: RootState, authorId: string) =>
  state.follows.follows.filter((follow) => follow.follower === authorId);

export const selectFollowStatus = (state: RootState) => state.follows.status;
export const selectFollowError = (state: RootState) => state.follows.error;

export default followsSlice.reducer;
