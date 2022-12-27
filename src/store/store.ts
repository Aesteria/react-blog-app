import { configureStore } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';
import postsReducer, { fetchAllPosts } from './postsSlice';
import authReducer, { login, logout } from './authSlice';
import usersReducer from './usersSlice';
import followersReducer from './followersSlice';
import followingReducer from './followingSlice';
import { CurrentUser } from '../types/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    followers: followersReducer,
    following: followingReducer,
  },
  preloadedState: {
    auth: {
      authenticated: Boolean(localStorage.getItem('authUser')),
      status: localStorage.getItem('authUser') ? 'resolved' : 'pending',
      currentUser: localStorage.getItem('authUser')
        ? (JSON.parse(
            localStorage.getItem('authUser') as string
          ) as CurrentUser)
        : {
            email: null,
            id: '',
            photoURL: null,
            username: null,
          },
    },
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const { displayName: username, email, photoURL, uid } = user;
    const userData = { email, username, photoURL, id: uid };
    localStorage.setItem('authUser', JSON.stringify(userData));
    store.dispatch(login(userData));
  } else {
    localStorage.removeItem('authUser');
    store.dispatch(logout());
  }
});

store.dispatch(fetchAllPosts());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
