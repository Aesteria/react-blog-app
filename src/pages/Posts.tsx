import { useEffect } from 'react';

import BlogCardList from '../components/BlogCards/PostCardList';
import Container from '../components/ui/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectPosts, toggleEditPosts } from '../store/posts/postsSlice';
import { selectIsUserAuthenticated } from '../store/users/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/ui/Loading';
import sortPostsByDate from '../utils/sortPostsByDate';
import Page from '../components/Page';

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
  }, [dispatch, isAuth]);

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
    <Page title={pageTitle}>
      <div className="bg-slate-100">
        <Container className="max-w-screen-2xl">{content}</Container>
      </div>
    </Page>
  );
}
