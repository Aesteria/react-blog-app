import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import fetchIsCurrentUserFollowing from '../../../api/fetchIsCurrentUserFollowing';
import { addFollower, deleteFollower } from '../../../store/followersSlice';
import { addFollowing, deleteFollowing } from '../../../store/followingSlice';
import { useAppDispatch } from '../../../store/hooks';

export default function useHandleFollow(userId: string, currentUserId: string) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const handleFollow = async () => {
    dispatch(
      addFollower({
        authorId: userId,
        currentUserId,
      })
    );
    dispatch(
      addFollowing({
        authorId: userId,
        currentUserId,
      })
    );
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    try {
      await dispatch(
        deleteFollower({
          authorId: userId,
          currentUserId,
        })
      ).unwrap();

      await dispatch(
        deleteFollowing({
          authorId: userId,
          currentUserId,
        })
      );
    } catch (e) {
      toast.error('Something went wrong');
    }
    setIsFollowing(false);
  };

  useEffect(() => {
    setIsFollowing(true);
    fetchIsCurrentUserFollowing(userId, currentUserId)
      .then((res) => {
        setIsFollowing(res);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong');
        setIsLoading(false);
      });
  }, [currentUserId, userId]);

  const isCurrentUserCanFollow = currentUserId !== userId;
  const showFollowButton = !isLoading && isCurrentUserCanFollow && !isFollowing;
  const showUnfollowButton =
    !isLoading && isCurrentUserCanFollow && isFollowing;

  return {
    showFollowButton,
    showUnfollowButton,
    handleFollow,
    handleUnfollow,
  };
}
