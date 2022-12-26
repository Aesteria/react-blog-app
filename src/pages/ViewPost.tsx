import {
  CalendarIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Container from '../components/ui/Container';
import Page from '../components/Page';
import UserAvatarImage from '../components/ui/UserAvatarImage';
import PageTitle from '../constants/pageTitle';
import { useAppSelector } from '../store/hooks';
import { selectPostById } from '../store/postsSlice';
import formatDate from '../utils/formatDate';
import HeadingSecondary from '../components/ui/HeadingSecondary';
import DeletePostModal from '../components/ui/DeletePostModal';
import { selectCurrentUser } from '../store/authSlice';

type ViewPostProps = {
  pageTitle: PageTitle;
};

export default function ViewPost({ pageTitle }: ViewPostProps) {
  const params = useParams<{ postId: string }>();
  const post = useAppSelector((state) =>
    selectPostById(state, params.postId as string)
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  if (!post) {
    return <h2>Post Not Found!</h2>;
  }

  const date = formatDate(post.createdDate);

  const handleDeletePost = () => {
    setShowModal(true);
  };

  const handleEditPost = () => {
    navigate(`/post/${post.id}/edit`);
  };

  return (
    <Page title={pageTitle}>
      <div className="py-16">
        <Container size="narrow">
          <DeletePostModal
            postId={post.id}
            open={showModal}
            setOpen={setShowModal}
          />
          <img
            src={post.coverImage}
            alt="Cover"
            className="mb-8 w-full object-cover h-post-cover"
          />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <UserAvatarImage size="small" src={post.author.photoURL} />
                <Link
                  to={`/profile/${post.author.id}/feed`}
                  className="ml-2 underline"
                >
                  {post.author.username}
                </Link>
              </div>
              <CalendarIcon className="h-6 w-6 text-fuchsia-500" />
              <span className="ml-2">{date}</span>
            </div>
            {currentUser.username === post.author.username && (
              <div className="flex">
                <button
                  onClick={handleEditPost}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-green-600 transition-backgroundColor mr-2 group/button"
                >
                  <PencilSquareIcon className="pointer-events-none w-5 h-auto transition-colors group-hover/button:text-white text-green-600" />
                </button>
                <button
                  onClick={handleDeletePost}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-red-600 transition-backgroundColor group/button"
                >
                  <TrashIcon className="pointer-events-none w-5 h-auto transition-colors group-hover/button:text-white text-red-500" />
                </button>
              </div>
            )}
          </div>

          <div className="mb-8">
            <HeadingSecondary>{post.title}</HeadingSecondary>
          </div>
          <div className="post-view">
            <ReactQuill theme="bubble" readOnly value={post.body} />
          </div>
        </Container>
      </div>
    </Page>
  );
}
