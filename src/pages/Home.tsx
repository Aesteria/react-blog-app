import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/Loading';
import { selectPosts, toggleEditPosts } from '../store/postsSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import PostCardList from '../components/PostCardList';
import Container from '../components/Container';
import sortPostsByDate from '../utils/sortPostsByDate';
import BlogPostList from '../components/BlogPostList';

const welcomeScreen = {
  title: 'Remember Writing?',
  body: `Are you sick of short tweets and impersonal “shared” posts that are
  reminiscent of the late 90’s email forwards? We believe getting back
  to actually writing is the key to enjoying the internet again.`,
  cover: 'coding',
};

type HomeProps = {
  pageTitle: PageTitle.Home;
};

export default function Home({ pageTitle }: HomeProps) {
  const isAuth = useAppSelector(selectIsUserAuthenticated);
  const data = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleEditPosts(false));
    document.title = pageTitle;
  }, [dispatch, pageTitle]);

  let content;

  if (data.status === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (data.status === RequestStatus.Resolved) {
    const orderedPosts = sortPostsByDate(data.posts);
    const blogPosts = orderedPosts.slice(0, 2);
    const blogCardListPosts = orderedPosts.slice(2, 6);
    const { isEdit } = data;

    content = (
      <>
        <BlogPostList blogPosts={blogPosts} />
        <div className="bg-slate-100">
          <Container className="max-w-screen-2xl">
            <PostCardList isEdit={isEdit} posts={blogCardListPosts} />
          </Container>
        </div>
      </>
    );
  }

  if (data.status === RequestStatus.Rejected) {
    content = <p>{data.error}</p>;
  }

  return (
    <div>
      {!isAuth && <WelcomeScreen data={welcomeScreen} />}
      {content}
    </div>
  );
}
