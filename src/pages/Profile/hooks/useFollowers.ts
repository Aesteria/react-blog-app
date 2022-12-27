import { useEffect } from 'react';
import RequestStatus from '../../../constants/requestStatus';

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
    if (followersStatus === RequestStatus.Idle) {
      dispatch(fetchFollowers(authorId));
    }
  }, [authorId, dispatch, followersStatus]);

  return {
    followersError,
    followers,
    followersStatus,
  };
}
