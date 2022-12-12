import { useEffect } from 'react';
import BlogCardList from '../components/BlogCardList';
import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchAllPosts,
  selectAllPosts,
  selectPostIsEdit,
  toggleEditPosts,
} from '../store/postsSlice';
import { selectIsUserAuthenticated } from '../store/userSlice';

type BlogsProps = {
  pageTitle: PageTitle.Blogs;
};

export default function Blogs({ pageTitle }: BlogsProps) {
  const isAuth = useAppSelector(selectIsUserAuthenticated);
  const posts = useAppSelector(selectAllPosts);
  const isEdit = useAppSelector(selectPostIsEdit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(toggleEditPosts(true));
    } else {
      dispatch(toggleEditPosts(false));
    }
    dispatch(fetchAllPosts());
    document.title = pageTitle;
  }, [dispatch, isAuth, pageTitle]);

  return (
    <div className="bg-slate-100">
      <Container className="max-w-screen-2xl">
        <BlogCardList isEdit={isEdit} blogs={posts} />
      </Container>
    </div>
  );
}
