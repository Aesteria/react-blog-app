import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/users/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/ui/Loading';
import { selectPosts, toggleEditPosts } from '../store/posts/postsSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import PostCardList from '../components/BlogCards/PostCardList';
import Container from '../components/ui/Container';
import sortPostsByDate from '../utils/sortPostsByDate';
import BlogPostList from '../components/BlogPosts/BlogPostList';
import Page from '../components/Page';

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
  }, [dispatch]);

  let content;

  if (data.status === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (data.status === RequestStatus.Resolved && data.posts.length > 0) {
    const orderedPosts = sortPostsByDate(data.posts);
    const blogPosts = orderedPosts.slice(0, 2);
    const blogCardListPosts = orderedPosts.slice(2, 6);
    const { isEdit } = data;

    content = (
      <>
        <BlogPostList blogPosts={blogPosts} />
        {blogCardListPosts.length > 0 && (
          <div className="bg-slate-100">
            <Container className="max-w-screen-2xl">
              <h3 className="font-light text-3xl pt-14">
                View More Recent Posts
              </h3>

              <PostCardList isEdit={isEdit} posts={blogCardListPosts} />
            </Container>
          </div>
        )}
      </>
    );
  }

  if (data.status === RequestStatus.Resolved && data.posts.length === 0) {
    content = (
      <Container>
        <h1 className="text-3xl text-center py-16">There are no posts.</h1>
      </Container>
    );
  }

  if (data.status === RequestStatus.Rejected) {
    content = <p>{data.error}</p>;
  }

  return (
    <Page title={pageTitle}>
      <div>
        {!isAuth && <WelcomeScreen data={welcomeScreen} />}
        {content}
      </div>
    </Page>
  );
}
