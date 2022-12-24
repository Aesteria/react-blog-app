import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const fetchIsCurrentUserFollowing = async (
  userId: string,
  currentUserId: string
) => {
  const docRef = doc(db, `followers/${userId}/userFollowers/${currentUserId}`);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

export default fetchIsCurrentUserFollowing;
