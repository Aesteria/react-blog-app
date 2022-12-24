import { useParams } from 'react-router-dom';
import FollowItem from '../../components/FollowItem';
import Loading from '../../components/ui/Loading';
import RequestStatus from '../../constants/requestStatus';
import useFollowing from './hooks/useFollowing';

export default function Following() {
  const params = useParams<{ authorId: string }>();
  const { following, followingError, followingStatus } = useFollowing(
    params.authorId as string
  );

  let content;

  if (followingStatus === RequestStatus.Rejected) {
    content = <p>{followingError}</p>;
  } else if (followingStatus === RequestStatus.Pending) {
    content = <Loading />;
  } else if (followingStatus === RequestStatus.Resolved) {
    content = following.map((follow) => (
      <FollowItem key={follow.userId} usernameId={follow.userId} />
    ));
  }

  return <div>{content}</div>;
}
