import { useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import BlogCardList from '../components/BlogCardList';
import { selectSampleBlogs, toggleEditPost } from '../store/sampleBlogsSlice';
import Container from '../components/Container';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const sampleBlogPosts = [
  {
    title: 'Remember Writing?',
    body: `Are you sick of short tweets and impersonal “shared” posts that are
  reminiscent of the late 90’s email forwards? We believe getting back
  to actually writing is the key to enjoying the internet again.`,
    welcomeScreen: true,
    cover: 'coding',
  },
  {
    title: 'Filler Title',
    body: 'This is a filler blog post title',
    cover: 'beautiful-stories',
  },
  {
    title: 'Filler Title',
    body: 'This is a filler blog post title',
    cover: 'designed-for-everyone',
  },
];

export default function Home() {
  const { blogs, isEdit } = useAppSelector(selectSampleBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleEditPost(false));
  }, [dispatch]);

  return (
    <div>
      {sampleBlogPosts.map((post, index) => (
        <BlogPost post={post} key={index} />
      ))}
      <div className="bg-slate-100">
        <Container className="max-w-screen-2xl">
          <BlogCardList isEdit={isEdit} blogs={blogs} />
        </Container>
      </div>
    </div>
  );
}
