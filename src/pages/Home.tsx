import { useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/Loading';
import {
  selectAllPosts,
  selectPostIsEdit,
  selectPostsError,
  toggleEditPosts,
} from '../store/postsSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import PostCardList from '../components/PostCardList';
import Container from '../components/Container';
import sortPostsByDate from '../utils/sortPostsByDate';

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
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsError = useAppSelector(selectPostsError);
  const postsIsEdit = useAppSelector(selectPostIsEdit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleEditPosts(false));
    document.title = pageTitle;
  }, [dispatch, pageTitle]);

  let content;

  if (postsStatus === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (postsStatus === RequestStatus.Resolved) {
    const orderedPosts = sortPostsByDate(posts);
    const blogPosts = orderedPosts.slice(0, 2);
    const blogCardListPosts = orderedPosts.slice(2, 6);

    content = (
      <>
        {blogPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
        <div className="bg-slate-100">
          <Container className="max-w-screen-2xl">
            <PostCardList isEdit={postsIsEdit} posts={blogCardListPosts} />
          </Container>
        </div>
      </>
    );
  }

  if (postsStatus === RequestStatus.Rejected) {
    content = <p>{postsError}</p>;
  }

  return (
    <div>
      {!isAuth && <WelcomeScreen data={welcomeScreen} />}
      {content}
    </div>
  );
}
