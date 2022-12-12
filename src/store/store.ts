import { configureStore } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import postsReducer from './postsSlice';
import userReducer, { login, logout } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const { displayName: username, email, photoURL, uid } = user;
    const token = await user.getIdToken();

    store.dispatch(login({ email, token, username, photoURL, id: uid }));
  } else {
    store.dispatch(logout());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
