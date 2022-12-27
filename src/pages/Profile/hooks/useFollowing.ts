import { useEffect } from 'react';
import RequestStatus from '../../../constants/requestStatus';

import {
  fetchFollowing,
  selectFollowingError,
  selectFollowingStatus,
} from '../../../store/followingSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function useFollowing(authorId: string) {
  const followingStatus = useAppSelector(selectFollowingStatus);
  const followingError = useAppSelector(selectFollowingError);
  const following = useAppSelector((state) => state.following.following);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (followingStatus === RequestStatus.Idle) {
      dispatch(fetchFollowing(authorId));
    }
  }, [authorId, dispatch, followingStatus]);

  return {
    followingStatus,
    followingError,
    following,
  };
}
