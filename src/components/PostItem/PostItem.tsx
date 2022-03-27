import { Link } from 'react-router-dom';
import { Post } from '../../types/post';
import { formatDate } from '../../utils/formatDate';

type PostItemProps = {
  post: Post;
  onClick?: () => void;
  isAuthor?: true;
};

const PostItem = ({
  post: {
    createdDate,
    _id,
    author: { avatar, username },
    title,
  },
  onClick,
  isAuthor,
}: PostItemProps) => {
  const dateFormatted = formatDate(createdDate);

  return (
    <Link
      to={`/post/${_id}`}
      className="list-group-item list-group-item-action"
      onClick={onClick}
    >
      <img className="avatar-tiny" src={avatar} alt="profile avatar" />{' '}
      <strong>{title}</strong>{' '}
      <span className="text-muted small">
        {!isAuthor ? `by ${username}` : ''} on {dateFormatted}
      </span>
    </Link>
  );
};

export default PostItem;
