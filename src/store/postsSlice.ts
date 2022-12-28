import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import RequestStatus from '../constants/requestStatus';
import type { RootState } from './store';

import { db } from '../firebase';
import { InitialPost, Post, UpdatedPost } from '../types/post';
import uploadFileInStorage from '../api/uploadFileInStorage';

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (data: InitialPost) => {
    const { author, body, cover, title } = data;
    const timestamp = Date.now();
    const url = await uploadFileInStorage(
      cover,
      `${author.id}/postCoverImages/${cover.name}`
    );

    const newPost = {
      createdDate: timestamp,
      author: {
        username: author.username,
        photoURL: author.photoURL,
        id: author.id,
      },
      body,
      coverImage: url,
      title,
    };
    const docRef = await addDoc(collection(db, 'posts'), newPost);

    return {
      ...newPost,
      id: docRef.id,
    };
  }
);

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    querySnapshot.forEach((document) => {
      posts.push({
        author: {
          id: document.data().author.id,
          username: document.data().author.username,
          photoURL: document.data().author.photoURL,
        },
        id: document.id,
        body: document.data().body,
        title: document.data().title,
        coverImage: document.data().coverImage,
        createdDate: document.data().createdDate,
      });
    });

    return posts;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: string) => {
    await deleteDoc(doc(db, 'posts', postId));
    return postId;
  }
);

type UpdatePostsAuthorByIdData = {
  data: string;
  authorId: string;
};

export const updatePostsAuthorAvatarById = createAsyncThunk(
  'posts/updatePostsAuthorAvatarById',
  async (data: UpdatePostsAuthorByIdData) => {
    const q = query(
      collection(db, 'posts'),
      where('author.id', '==', data.authorId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      updateDoc(document.ref, {
        'author.photoURL': data.data,
      });
    });

    return data;
  }
);

export const updatePostsAuthorNameById = createAsyncThunk(
  'posts/updatePostsAuthorNameById',
  async (data: UpdatePostsAuthorByIdData) => {
    const q = query(
      collection(db, 'posts'),
      where('author.id', '==', data.authorId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      updateDoc(document.ref, {
        'author.username': data.data,
      });
    });

    return data;
  }
);

type UpdatePostData = {
  post: UpdatedPost;
  id: string;
};

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (data: UpdatePostData) => {
    const docRef = doc(db, 'posts', data.id);
    await updateDoc(docRef, data.post);

    return {
      ...data.post,
      id: data.id,
    };
  }
);

type InitialState = {
  posts: Post[];
  status: RequestStatus;
  error?: string;
};

const initialState: InitialState = {
  posts: [],
  status: RequestStatus.Idle,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = RequestStatus.Resolved;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        const existingPost = state.posts.find(
          (post) => post.id === action.payload.id
        );
        if (!existingPost) {
          throw new Error('somethign went wrong with post update');
        }
        state.posts[existingPostIndex] = {
          ...existingPost,
          body: action.payload.body,
          title: action.payload.title,
          coverImage: action.payload.coverImage,
          createdDate: Date.now(),
        };
      })
      .addCase(updatePostsAuthorAvatarById.fulfilled, (state, action) => {
        state.posts.forEach((post) => {
          if (post.author.id === action.payload.authorId) {
            // eslint-disable-next-line no-param-reassign
            post.author.photoURL = action.payload.data;
          }
        });
      })
      .addCase(updatePostsAuthorNameById.fulfilled, (state, action) => {
        state.posts.forEach((post) => {
          if (post.author.id === action.payload.authorId) {
            // eslint-disable-next-line no-param-reassign
            post.author.username = action.payload.data;
          }
        });
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostById = (state: RootState, id: string) =>
  state.posts.posts.find((post) => post.id === id);
export const selectPostsByAuthorId = (state: RootState, id: string) =>
  state.posts.posts.filter((post) => post.author.id === id);
export const selectFilteredPosts = (state: RootState, searchTerm: string) =>
  state.posts.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

export const selectPostsByFollowing = (state: RootState, following: string[]) =>
  state.posts.posts.filter((post) => following.includes(post.author.id));
export default postsSlice.reducer;
