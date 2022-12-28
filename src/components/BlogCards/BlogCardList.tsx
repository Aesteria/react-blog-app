import RequestStatus from '../../constants/requestStatus';
import useFollowing from '../../hooks/useFollowing';
import { selectCurrentUser } from '../../store/authSlice';
import { useAppSelector } from '../../store/hooks';
import {
  selectPostsError,
  selectPostsStatus,
  selectPostsByFollowing,
} from '../../store/postsSlice';
import Loading from '../ui/Loading';
import BlogCard from './BlogCard';

type BlogCardListProps = {
  searchTerm: string;
};

export default function BlogCardList({ searchTerm }: BlogCardListProps) {
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const user = useAppSelector(selectCurrentUser);
  const { following, followingError, followingStatus } = useFollowing(user.id);
  const posts = useAppSelector((state) =>
    selectPostsByFollowing(state, following)
  );

  let content;

  if (
    status === RequestStatus.Rejected ||
    followingStatus === RequestStatus.Rejected
  ) {
    content = (
      <div>
        <p>{error}</p>
        <p>{followingError}</p>
      </div>
    );
  } else if (
    status === RequestStatus.Pending ||
    followingStatus === RequestStatus.Pending
  ) {
    content = <Loading />;
  } else if (
    status === RequestStatus.Resolved &&
    followingStatus === RequestStatus.Resolved
  ) {
    content = posts.map((post) => <BlogCard key={post.id} post={post} />);
  }

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {content}
    </div>
  );
}
