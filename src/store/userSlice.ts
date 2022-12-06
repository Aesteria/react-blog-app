import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type CurrentUser = {
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

const userSlice = createSlice({
  name: 'auth',
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
});

export const { login, logout } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCurrentUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
