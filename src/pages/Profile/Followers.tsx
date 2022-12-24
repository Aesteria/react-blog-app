import { useParams } from 'react-router-dom';
import FollowItem from '../../components/FollowItem';
import Loading from '../../components/ui/Loading';
import RequestStatus from '../../constants/requestStatus';
import useFollowers from './hooks/useFollowers';

export default function Followers() {
  const params = useParams<{ authorId: string }>();
  const { followers, followersError, followersStatus } = useFollowers(
    params.authorId as string
  );

  let content;

  if (followersStatus === RequestStatus.Rejected) {
    content = <p>{followersError}</p>;
  } else if (followersStatus === RequestStatus.Pending) {
    content = <Loading />;
  } else if (followersStatus === RequestStatus.Resolved) {
    content =
      followers.length > 0 ? (
        followers.map((follower) => (
          <FollowItem key={follower.userId} usernameId={follower.userId} />
        ))
      ) : (
        <p>You have no followers yet</p>
      );
  }

  return <div>{content}</div>;
}
