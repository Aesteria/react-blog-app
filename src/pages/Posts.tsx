import { useEffect } from 'react';
import BlogCardList from '../components/PostCardList';
import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectAllPosts,
  selectPostIsEdit,
  selectPostsError,
  selectPostsStatus,
  toggleEditPosts,
} from '../store/postsSlice';
import { selectIsUserAuthenticated } from '../store/userSlice';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/Loading';
import sortPostsByDate from '../utils/sortPostsByDate';

type PostsProps = {
  pageTitle: PageTitle.Posts;
};

export default function Posts({ pageTitle }: PostsProps) {
  const isAuth = useAppSelector(selectIsUserAuthenticated);
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);
  const isEdit = useAppSelector(selectPostIsEdit);
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

  if (postsStatus === RequestStatus.Pending) {
    content = <Loading />;
  }

  if (postsStatus === RequestStatus.Resolved) {
    const orderedPosts = sortPostsByDate(posts);
    content = <BlogCardList isEdit={isEdit} posts={orderedPosts} />;
  }

  if (postsStatus === RequestStatus.Rejected) {
    content = <p>{postsError}</p>;
  }

  return (
    <div className="bg-slate-100">
      <Container className="max-w-screen-2xl">{content}</Container>
    </div>
  );
}
