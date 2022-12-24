import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import fetchIsCurrentUserFollowing from '../../../api/fetchIsCurrentUserFollowing';
import {
  selectCurrentUser,
  selectIsUserAuthenticated,
} from '../../../store/authSlice';
import { addFollower, deleteFollower } from '../../../store/followersSlice';
import { addFollowing, deleteFollowing } from '../../../store/followingSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function useHandleFollow(userId: string) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useAppSelector(selectCurrentUser);
  const auth = useAppSelector(selectIsUserAuthenticated);
  const [status, setStatus] = useState<'idle' | 'resolved'>('idle');

  const dispatch = useAppDispatch();
  const handleFollow = async () => {
    try {
      setIsLoading(true);
      dispatch(
        addFollower({
          authorId: userId,
          currentUserId: id,
        })
      );
      dispatch(
        addFollowing({
          authorId: userId,
          currentUserId: id,
        })
      );
      setIsFollowing(true);
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        deleteFollower({
          authorId: userId,
          currentUserId: id,
        })
      ).unwrap();

      await dispatch(
        deleteFollowing({
          authorId: userId,
          currentUserId: id,
        })
      );
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
    setIsFollowing(false);
  };

  useEffect(() => {
    if (auth) {
      fetchIsCurrentUserFollowing(userId, id)
        .then((res) => {
          setIsFollowing(res);
          setStatus('resolved');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    }
  }, [auth, id, userId]);

  const isCurrentUserCanFollow = auth && id !== userId;
  const showFollowButton =
    isCurrentUserCanFollow && !isFollowing && status === 'resolved';
  const showUnfollowButton =
    isCurrentUserCanFollow && isFollowing && status === 'resolved';

  return {
    showFollowButton,
    showUnfollowButton,
    handleFollow,
    handleUnfollow,
    isLoading,
  };
}
