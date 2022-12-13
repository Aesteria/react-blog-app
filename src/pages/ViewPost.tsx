import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
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

  const date = formatDate(post?.createdDate);

  return (
    <div className="post-view">
      <Container>
        <h2>{post.title}</h2>
        <h4 className="font-normal text-sm mb-3">Posted on: {date}</h4>
        <img src={post.coverImage} alt="Cover" />
        <div className="post-content">
          <ReactQuill theme="bubble" readOnly value={post.body} />
        </div>
      </Container>
    </div>
  );
}
