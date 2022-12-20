import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Testing from './Testing';

type FollowType = {
  author: string;
  follower: string;
  id: string;
};

export default function Following() {
  const params = useParams<{ authorId: string }>();
  const [state, setState] = useState<FollowType[]>([]);

  useEffect(() => {
    if (params.authorId) {
      const fetchData = async () => {
        const q = query(
          collection(db, 'follow'),
          where('author', '==', params.authorId)
        );

        const querySnapshot = await getDocs(q);
        const newData: FollowType[] = [];
        querySnapshot.forEach((document) => {
          newData.push({
            id: document.id,
            author: document.data().author,
            follower: document.data().follower,
          });
        });

        setState(newData);
      };

      fetchData();
    }
  }, [params.authorId]);

  return (
    <div>
      {state.map((follow) => (
        <Testing follower={follow.follower} />
      ))}
    </div>
  );
}
