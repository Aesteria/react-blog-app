import RequestStatus from '../../constants/requestStatus';
import { useAppSelector } from '../../store/hooks';
import {
  selectFilteredPosts,
  selectPostsError,
  selectPostsStatus,
} from '../../store/postsSlice';
import Loading from '../ui/Loading';
import BlogCard from './BlogCard';

type BlogCardListProps = {
  searchTerm: string;
};

export default function BlogCardList({ searchTerm }: BlogCardListProps) {
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const posts = useAppSelector((state) =>
    selectFilteredPosts(state, searchTerm)
  );

  let content;

  if (status === RequestStatus.Rejected) {
    content = <p>{error}</p>;
  } else if (status === RequestStatus.Pending) {
    content = <Loading />;
  } else if (status === RequestStatus.Resolved) {
    content = posts.map((post) => <BlogCard key={post.id} post={post} />);
  }

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {content}
    </div>
  );
}
