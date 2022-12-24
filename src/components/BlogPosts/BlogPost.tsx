import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { Post } from '../../types/post';
import Button from '../ui/Button';
import HeadingSecondary from '../ui/HeadingSecondary';

type BlogPostProps = {
  post: Post;
};

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="lg:relative flex flex-col md:flex-row md:h-blog-post [&:nth-child(odd)>*:nth-child(1)]:order-2 [&:nth-child(odd)>*:nth-child(2)]:order-1 shadow-md">
      <div className="flex justify-center items-center flex-4 order-2 md:order-1 md:flex-3 py-10 px-6">
        <div className="w-96 post-view">
          <HeadingSecondary className="mb-5">{post.title}</HeadingSecondary>
          <ReactQuill theme="bubble" readOnly value={post.body.slice(0, 150)} />
          <div className="mt-10">
            <Button round to={`/post/${post.id}`} className="rounded-md shadow">
              View The Post
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex-3 order-1 md:order-2 md:flex-4">
        <img
          className="block w-full h-full object-cover"
          src={post.coverImage}
          alt="post cover"
        />
      </div>
    </div>
  );
}
