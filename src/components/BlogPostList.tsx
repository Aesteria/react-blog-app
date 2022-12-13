import { Post } from '../types/post';
import BlogPost from './BlogPost';

type BlogPostListProps = {
  blogPosts: Post[];
};

export default function BlogPostList({ blogPosts }: BlogPostListProps) {
  return (
    <>
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </>
  );
}
