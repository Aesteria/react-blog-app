import { Link, useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import { useAppSelector } from '../../store/hooks';
import { selectPostsByAuthorName } from '../../store/postsSlice';

export default function Feed() {
  const { authorName } = useParams<{ authorName: string }>();
  const posts = useAppSelector((state) =>
    selectPostsByAuthorName(state, authorName ?? '')
  );

  if (!authorName) return <p>User Not Found</p>;

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 hover:bg-slate-200 rounded-sm transition-backgroundColor"
          >
            <Link to={`/post/${post.id}`} className="flex space-x-3">
              <UserAvatarImage size="small" src={post.author.photoURL} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {post.author.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdDate)}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{post.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
