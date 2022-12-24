import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import RequestStatus from '../constants/requestStatus';
import { db } from '../firebase';
import { UserProfile } from '../types/profile';
import type { RootState } from './store';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  const users: UserProfile[] = [];
  querySnapshot.forEach((document) => {
    users.push({
      id: document.id,
      email: document.data().email,
      photoURL: document.data().photoURL,
      username: document.data().username,
    });
  });

  return users;
});

type UpdateUserByIdData = {
  userId: string;
  data: string;
};

export const updateUserNameById = createAsyncThunk(
  'users/updateUserNameById',
  async (data: UpdateUserByIdData) => {
    const docRef = doc(db, 'users', data.userId);
    await updateDoc(docRef, {
      username: data.data,
    });

    return data;
  }
);

export const updateUserAvatarById = createAsyncThunk(
  'users/updateUserAvatarById',
  async (data: UpdateUserByIdData) => {
    const docRef = doc(db, 'users', data.userId);
    await updateDoc(docRef, {
      photoURL: data.data,
    });

    return data;
  }
);

type InitialState = {
  users: UserProfile[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  users: [],
  status: RequestStatus.Idle,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Resolved;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(updateUserAvatarById.fulfilled, (state, action) => {
        const existingUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.userId
        );
        state.users[existingUserIndex].photoURL = action.payload.data;
      })
      .addCase(updateUserNameById.fulfilled, (state, action) => {
        const existingUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.userId
        );
        state.users[existingUserIndex].username = action.payload.data;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUserById = (state: RootState, id: string | undefined) =>
  state.users.users.find((user) => user.id === id);

export default usersSlice.reducer;
