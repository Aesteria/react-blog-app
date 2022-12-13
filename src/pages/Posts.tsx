import { useEffect } from 'react';
import BlogCardList from '../components/PostCardList';
import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectPosts, toggleEditPosts } from '../store/postsSlice';
import { selectIsUserAuthenticated } from '../store/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/Loading';
import sortPostsByDate from '../utils/sortPostsByDate';

type PostsProps = {
  pageTitle: PageTitle.Posts;
};

export default function Posts({ pageTitle }: PostsProps) {
  const isAuth = useAppSelector(selectIsUserAuthenticated);
  const data = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(toggleEditPosts(true));
    } else {
      dispatch(toggleEditPosts(false));
    }
    document.title = pageTitle;
  }, [dispatch, isAuth, pageTitle]);

  let content;

  if (data.status === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (data.status === RequestStatus.Resolved) {
    const orderedPosts = sortPostsByDate(data.posts);
    content = <BlogCardList isEdit={data.isEdit} posts={orderedPosts} />;
  }

  if (data.status === RequestStatus.Rejected) {
    content = <p>{data.error}</p>;
  }

  return (
    <div className="bg-slate-100">
      <Container className="max-w-screen-2xl">{content}</Container>
    </div>
  );
}
