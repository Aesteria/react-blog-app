import RequestStatus from '../../constants/requestStatus';
import { useAppSelector } from '../../store/hooks';
import {
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from '../../store/postsSlice';
import sortPostsByDate from '../../utils/sortPostsByDate';
import Loading from '../ui/Loading';
import BlogCard from './BlogCard';

type BlogCardListProps = {
  searchTerm: string;
};

export default function BlogCardList({ searchTerm }: BlogCardListProps) {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);

  let content;

  if (status === RequestStatus.Rejected) {
    content = <p>{error}</p>;
  } else if (status === RequestStatus.Pending) {
    content = <Loading />;
  } else if (status === RequestStatus.Resolved) {
    content = sortPostsByDate(posts)
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((post) => <BlogCard key={post.id} post={post} />);
  }

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {content}
    </div>
  );
}