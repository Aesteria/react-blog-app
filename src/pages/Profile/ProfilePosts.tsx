import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';

const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`/profile/${username}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log('There was a problem fetching profile posts');
      }
    };

    fetchPosts();
  }, [username]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="list-group">
      {posts.map(({ _id, author: { avatar }, title, createdDate }) => {
        const dateFormatted = formatDate(createdDate);

        return (
          <Link
            key={_id}
            to={`/post/${_id}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={avatar} alt="profile avatar" />{' '}
            <strong>{title}</strong>{' '}
            <span className="text-muted small">on {dateFormatted}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
