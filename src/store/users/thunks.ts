import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';

type RegisterFields = {
  email: string;
  password: string;
  username: string;
};

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (data: RegisterFields) => {
  const { email, password, username } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: username,
  });

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    username,
    email,
  });
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
