import { configureStore } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';
import postsReducer, { fetchAllPosts } from './postsSlice';
import authReducer, { login, logout } from './authSlice';
import usersReducer from './usersSlice';
import followsReducer from './followsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    follows: followsReducer,
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

store.dispatch(fetchAllPosts());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
