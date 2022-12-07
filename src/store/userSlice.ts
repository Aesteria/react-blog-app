import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import type { RootState } from './store';

export type CurrentUser = {
  email: string | null;
  token: string;
  username: string | null;
  photoURL: string | null;
  id: string;
};

type InitialState = {
  currentUser: CurrentUser | null;
  status: 'pending' | 'resolved';
};

const initialState: InitialState = {
  currentUser: null,
  status: 'pending',
};

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
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
  'user/updateUsername',
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
      state.status = 'resolved';
    },
    logout(state) {
      state.currentUser = null;
      state.status = 'resolved';
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

export const { login, logout } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectAuthStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
