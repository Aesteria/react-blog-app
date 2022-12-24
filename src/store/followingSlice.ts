import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import RequestStatus from '../constants/requestStatus';
import { db } from '../firebase';
import { AddFollowData, UserFollower } from '../types/follow';
import type { RootState } from './store';

type InitialState = {
  following: UserFollower[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  following: [],
  status: RequestStatus.Idle,
};

export const fetchFollowing = createAsyncThunk(
  'following/fetchFollowing',
  async (userId: string) => {
    const querySnapshot = await getDocs(
      collection(db, `following/${userId}/userFollowing`)
    );
    const newData: UserFollower[] = [];
    querySnapshot.forEach((document) => {
      newData.push({
        userId: document.id,
      });
    });

    return newData;
  }
);

export const addFollowing = createAsyncThunk(
  'following/addFollowing',
  async (data: AddFollowData) => {
    const followingRef = doc(db, 'following', data.currentUserId);
    await setDoc(followingRef, {});

    const userFollowingRef = doc(
      db,
      `following/${data.currentUserId}/userFollowing`,
      data.authorId
    );

    await setDoc(userFollowingRef, {});
  }
);

export const deleteFollowing = createAsyncThunk(
  'following/deleteFollowing',
  async (data: AddFollowData) => {
    const followingRef = doc(
      db,
      `following/${data.currentUserId}/userFollowing/${data.authorId}`
    );
    const following = await getDoc(followingRef);

    if (following.exists()) {
      deleteDoc(followingRef);
    }
  }
);

const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.status = RequestStatus.Resolved;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchFollowing.pending, (state) => {
        state.status = RequestStatus.Pending;
      });
  },
});

export const selectFollowingStatus = (state: RootState) =>
  state.following.status;
export const selectFollowingError = (state: RootState) => state.following.error;

export default followingSlice.reducer;
