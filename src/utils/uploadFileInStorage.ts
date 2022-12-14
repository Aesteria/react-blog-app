import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

const uploadFileInStorage = async (file: File, filePath: string) => {
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};

export default uploadFileInStorage;
