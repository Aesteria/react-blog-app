import { useEffect } from 'react';
import BlogCardList from '../components/BlogCardList';
import Container from '../components/Container';
import DocumentTitles from '../constants/documentTitles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSampleBlogs, toggleEditPost } from '../store/sampleBlogsSlice';

export default function Blogs() {
  const { blogs, isEdit } = useAppSelector(selectSampleBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleEditPost(true));
    document.title = DocumentTitles.Blogs;
  }, [dispatch]);

  return (
    <Container>
      <BlogCardList isEdit={isEdit} blogs={blogs} />
    </Container>
  );
}
