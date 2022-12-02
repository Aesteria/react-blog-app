import { useEffect } from 'react';
import BlogCardList from '../components/BlogCardList';
import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSampleBlogs, toggleEditPost } from '../store/sampleBlogsSlice';

type BlogsProps = {
  pageTitle: PageTitle.Blogs;
};

export default function Blogs({ pageTitle }: BlogsProps) {
  const { blogs, isEdit } = useAppSelector(selectSampleBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleEditPost(true));
    document.title = pageTitle;
  }, [dispatch, pageTitle]);

  return (
    <Container>
      <BlogCardList isEdit={isEdit} blogs={blogs} />
    </Container>
  );
}
