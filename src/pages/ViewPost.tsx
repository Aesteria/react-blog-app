import { CalendarIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import UserAvatarImage from '../components/UserAvatarImage';
import { useAppSelector } from '../store/hooks';
import { selectPostById } from '../store/postsSlice';
import formatDate from '../utils/formatDate';

export default function ViewPost() {
  const params = useParams<{ postId: string }>();
  const post = useAppSelector((state) =>
    selectPostById(state, params.postId as string)
  );

  if (!post) {
    return <h2>Post Not Found!</h2>;
  }

  const date = formatDate(post.createdDate);

  return (
    <div className="py-16">
      <Container className="max-w-5xl">
        <img src={post.coverImage} alt="Cover" className="mb-8" />
        <div className="flex items-center mb-8">
          <div className="flex items-center mr-4">
            <UserAvatarImage size="small" src={post.author.photoURL} />
            <span className="ml-2">{post.author.username}</span>
          </div>
          <CalendarIcon className="h-6 w-6 text-fuchsia-500" />
          <span className="ml-2">{date}</span>
        </div>
        <h2 className="mb-8 text-3xl font-light">{post.title}</h2>
        <div className="post-view">
          <ReactQuill theme="bubble" readOnly value={post.body} />
        </div>
      </Container>
    </div>
  );
}
