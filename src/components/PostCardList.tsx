import { Post } from '../types/post';
import BlogCard from './BlogCard/BlogCard';

type BlogCardListProps = {
  posts: Post[];
  isEdit: boolean;
};

export default function BlogCardList({ posts, isEdit }: BlogCardListProps) {
  return (
    <div className="relative py-20 px-4">
      <div>
        <h3 className="font-light text-3xl mb-8">View More Recent Posts</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, index) => (
            <BlogCard isEdit={isEdit} post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
