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
import { AddFollowData } from '../types/follow';
import type { RootState } from './store';

type InitialState = {
  following: string[];
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
    const newData: string[] = [];
    querySnapshot.forEach((document) => {
      newData.push(document.id);
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

    return data.authorId;
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

    return data.authorId;
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
      })
      .addCase(deleteFollowing.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (follow) => follow !== action.payload
        );
      })
      .addCase(addFollowing.fulfilled, (state, action) => {
        state.following.push(action.payload);
      });
  },
});

export const selectFollowingStatus = (state: RootState) =>
  state.following.status;
export const selectFollowingError = (state: RootState) => state.following.error;
export const selectFollowing = (state: RootState) => state.following.following;

export default followingSlice.reducer;
