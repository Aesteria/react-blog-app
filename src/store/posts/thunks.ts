import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { InitialPost, Post, UpdatedPost } from '../../types/post';
import uploadFileInStorage from '../../utils/uploadFileInStorage';

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
