import { useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/Loading';
import { fetchAllPosts, toggleEditPosts } from '../store/postsSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import BlogCardList from '../components/BlogCardList';
import Container from '../components/Container';

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
  const posts = useAppSelector((state) => state.posts.posts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsError = useAppSelector((state) => state.posts.error);
  const postsIsEdit = useAppSelector((state) => state.posts.isEdit);
  const dispatch = useAppDispatch();

  const blogPosts = posts.slice(0, 2);
  const blogCardListPosts = posts.slice(2, 6);

  useEffect(() => {
    dispatch(toggleEditPosts(false));
    dispatch(fetchAllPosts());
    document.title = pageTitle;
  }, [dispatch, pageTitle]);

  let content;

  if (postsStatus === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (postsStatus === RequestStatus.Resolved) {
    content = blogPosts.map((post) => <BlogPost key={post.id} post={post} />);
  }

  if (postsStatus === RequestStatus.Rejected) {
    content = <p>{postsError}</p>;
  }

  return (
    <div>
      {!isAuth && <WelcomeScreen data={welcomeScreen} />}
      {/* {sampleBlogPosts.map((post, index) => (
        <BlogPost post={post} key={index} />
      ))} */}
      {content}
      <div className="bg-slate-100">
        <Container className="max-w-screen-2xl">
          <BlogCardList isEdit={postsIsEdit} blogs={blogCardListPosts} />
        </Container>
      </div>
    </div>
  );
}
