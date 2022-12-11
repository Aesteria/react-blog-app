import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';
import { InitialPost } from '../types/post';

// eslint-disable-next-line import/prefer-default-export
export const createPost = async (post: InitialPost) => {
  const { author, body, cover, title } = post;
  const timestamp = Date.now();
  const storageRef = ref(storage, `${author.id}/postCoverImages/${cover.name}`);

  // Upload cover blog image to firestore and retrieve it's url
  await uploadBytes(storageRef, cover);
  const url = await getDownloadURL(storageRef);

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
};
