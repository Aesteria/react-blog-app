import {
  ArrowRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePostById } from '../../store/posts/postsSlice';
import { selectCurrentUser } from '../../store/users/userSlice';
import { Post } from '../../types/post';
import formatDate from '../../utils/formatDate';
import UserAvatarImage from '../ui/UserAvatarImage';

type BlogCardProps = {
  post: Post;
  isEdit: boolean;
};

export default function BlogCard({ post, isEdit }: BlogCardProps) {
  const dispatch = useAppDispatch();
  const date = formatDate(post.createdDate);
  const user = useAppSelector(selectCurrentUser);
  const allowEdit = isEdit && user.username === post.author.username;

  const handleDeletePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePostById(post.id));
  };

  const handleEditPost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/post/${post.id}`}>
      <div className="relative flex flex-col rounded-lg bg-white shadow-sm hover:shadow-2xl transition-shadow group">
        {allowEdit && (
          <div className="flex absolute top-2 right-2 transition-opacity opacity-0 group-hover:opacity-100">
            <button
              onClick={handleEditPost}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-600 transition-backgroundColor mr-2 group/button"
            >
              <PencilSquareIcon className="pointer-events-none w-5 h-auto transition-colors group-hover/button:text-white" />
            </button>
            <button
              onClick={handleDeletePost}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-600 transition-backgroundColor group/button"
            >
              <TrashIcon className="pointer-events-none w-5 h-auto transition-colors group-hover/button:text-white" />
            </button>
          </div>
        )}
        <img
          src={post.coverImage}
          alt="Cover"
          className="rounded-t-lg h-52 object-cover select-none"
        />
        <div className="flex flex-1 flex-col py-8 px-4">
          <div className="flex items-center gap-2 justify-between mb-4">
            <div className="overflow-hidden flex items-center gap-2 text-xs">
              <UserAvatarImage src={post.author.photoURL} size="small" />
              Posted by {post.author.username}
            </div>
            <h6 className="font-normal text-xs">on {date}</h6>
          </div>
          <h4 className="pb-2 font text-xl font-light">{post.title}</h4>
          <span className="flex items-center mt-auto font-medium pt-5 text-xs pb-1">
            View The Post <ArrowRightIcon className="w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
