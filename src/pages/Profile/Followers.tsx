import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FollowItem from '../../components/FollowItem';
import Loading from '../../components/ui/Loading';
import RequestStatus from '../../constants/requestStatus';
import {
  fetchFollows,
  selectFollowError,
  selectFollowersByAuthorId,
  selectFollowStatus,
} from '../../store/followsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type FollowType = {
  author: string;
  follower: string;
  id: string;
};

export default function Followers() {
  const params = useParams<{ authorId: string }>();
  const dispatch = useAppDispatch();
  const followers = useAppSelector((state) =>
    selectFollowersByAuthorId(state, params.authorId as string)
  );

  const followersStatus = useAppSelector(selectFollowStatus);
  const followersError = useAppSelector(selectFollowError);

  useEffect(() => {
    if (followersStatus === RequestStatus.Idle) {
      dispatch(fetchFollows());
    }
  }, [dispatch, followersStatus]);

  let content;

  if (followersStatus === RequestStatus.Rejected) {
    content = <p>{followersError}</p>;
  }

  if (followersStatus === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (followersStatus === RequestStatus.Resolved) {
    content = followers.map((follower) => (
      <FollowItem key={follower.id} usernameId={follower.follower} />
    ));
  }

  return <div>{content}</div>;
}
