import { configureStore } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import sampleBlogsReducer from './sampleBlogsSlice';
import userReducer, { login, logout } from './userSlice';

export const store = configureStore({
  reducer: {
    sampleBlogs: sampleBlogsReducer,
    user: userReducer,
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const { displayName: username, email, photoURL } = user;
    const token = await user.getIdToken();

    store.dispatch(login({ email, token, username, photoURL }));
  } else {
    store.dispatch(logout());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
