import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
