import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentUser } from '../../types/user';
import type { RootState } from '../store';
import { updateAvatar, updateUsername } from './thunks';

type InitialState = {
  currentUser: CurrentUser;
  authenticated: boolean;
  status: 'pending' | 'resolved';
};

const initialState: InitialState = {
  currentUser: {
    email: null,
    token: '',
    username: null,
    photoURL: null,
    id: '',
  },
  authenticated: false,
  status: 'pending',
};

const userSlice = createSlice({
  name: 'user',
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

export const { login, logout } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsUserAuthenticated = (state: RootState) =>
  state.user.authenticated;
export const selectAuthStateChange = (state: RootState) => state.user.status;

export default userSlice.reducer;
