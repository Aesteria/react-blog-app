import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Post } from '../../types/post';
import formatDate from '../../utils/formatDate';
import UserAvatarImage from '../ui/UserAvatarImage';
import 'react-quill/dist/quill.bubble.css';

type BlogCardProps = {
  post: Post;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={post.coverImage}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <div className="post-view blog-card">
            <p className="text-xl font-semibold text-gray-900 mb-5">
              {post.title}
            </p>
            <ReactQuill
              readOnly
              theme="bubble"
              value={post.body.slice(0, 150)}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div>
              <span className="sr-only">{post.author.username}</span>
              <UserAvatarImage src={post.author.photoURL} />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <span className="hover:underline">{post.author.username}</span>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={formatDate(post.createdDate)}>
                {formatDate(post.createdDate)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
