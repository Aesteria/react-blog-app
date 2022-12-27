import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import type { RootState } from './store';
import { CurrentUser } from '../types/user';
import { auth, db, storage } from '../firebase';

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (file: File) => {
    const user = auth.currentUser as User;
    const storageRef = ref(storage, `${user.uid}/avatar`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    await updateProfile(user, {
      photoURL: url,
    });

    await updateDoc(doc(db, 'users', user.uid), {
      photoURL: url,
    });

    return url;
  }
);

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (newName: string) => {
    const user = auth.currentUser as User;
    await updateProfile(user, {
      displayName: newName,
    });

    await updateDoc(doc(db, 'users', user.uid), {
      username: newName,
    });

    return newName;
  }
);

type InitialState = {
  currentUser: CurrentUser;
  authenticated: boolean;
  status: 'pending' | 'resolved';
};

const initialState: InitialState = {
  currentUser: {
    email: null,
    username: null,
    photoURL: null,
    id: '',
  },
  authenticated: false,
  status: 'pending',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<CurrentUser>) {
      state.authenticated = true;
      state.currentUser = action.payload;
      state.status = 'resolved';
    },
    logout(state) {
      state.authenticated = false;
      state.status = 'resolved';
      state.currentUser = initialState.currentUser;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.photoURL = action.payload;
        }
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.username = action.payload;
        }
      });
  },
});

export const { login, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsUserAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectAuthStateChange = (state: RootState) => state.auth.status;

export default authSlice.reducer;
