import { configureStore } from '@reduxjs/toolkit';
import sampleBlogsReducer from './sampleBlogsSlice';

export const store = configureStore({
  reducer: {
    sampleBlogs: sampleBlogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
