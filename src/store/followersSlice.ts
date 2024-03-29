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
  followers: string[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  followers: [],
  status: RequestStatus.Idle,
};

export const fetchFollowers = createAsyncThunk(
  'followers/fetchFollowers',
  async (userId: string) => {
    const querySnapshot = await getDocs(
      collection(db, `followers/${userId}/userFollowers`)
    );
    const newData: string[] = [];
    querySnapshot.forEach((document) => {
      newData.push(document.id);
    });
    return newData;
  }
);

export const addFollower = createAsyncThunk(
  'followers/addFollow',
  async (data: AddFollowData) => {
    const followersRef = doc(db, 'followers', data.authorId);
    await setDoc(followersRef, {});

    const userFollowersRef = doc(
      db,
      `followers/${data.authorId}/userFollowers`,
      data.currentUserId
    );

    await setDoc(userFollowersRef, {});

    return data.currentUserId;
  }
);

export const deleteFollower = createAsyncThunk(
  'followers/deleteFollower',
  async (data: AddFollowData) => {
    // Get current follower document reference
    const followerRef = doc(
      db,
      `followers/${data.authorId}/userFollowers/${data.currentUserId}`
    );
    const follower = await getDoc(followerRef);

    // if follower exists in collection delete it
    if (follower.exists()) {
      deleteDoc(followerRef);
    }

    return data.currentUserId;
  }
);

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.status = RequestStatus.Resolved;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchFollowers.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(addFollower.fulfilled, (state, action) => {
        state.followers.push(action.payload);
      })
      .addCase(deleteFollower.fulfilled, (state, action) => {
        state.followers = state.followers.filter(
          (follower) => follower !== action.payload
        );
      });
  },
});

export const selectFollowersStatus = (state: RootState) =>
  state.followers.status;
export const selectFollowersError = (state: RootState) => state.followers.error;

export default followersSlice.reducer;
