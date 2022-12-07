import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

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
  const avatar = await getDownloadURL(ref(storage, 'defaults/profile.png'));

  await updateProfile(userCredential.user, {
    displayName: username,
    photoURL: avatar,
  });

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    username,
    email,
    photoURL: avatar,
  });
};
