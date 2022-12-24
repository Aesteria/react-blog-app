import { useEffect } from 'react';

import {
  fetchFollowers,
  selectFollowersError,
  selectFollowersStatus,
} from '../../../store/followersSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function useFollowers(authorId: string) {
  const followersStatus = useAppSelector(selectFollowersStatus);
  const followersError = useAppSelector(selectFollowersError);
  const followers = useAppSelector((state) => state.followers.followers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFollowers(authorId));
  }, [authorId, dispatch]);

  return {
    followersError,
    followers,
    followersStatus,
  };
}
