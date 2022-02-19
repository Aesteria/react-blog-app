import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfilePost } from '../../types/Profile';

const ProfilePosts = () => {
  const [posts, setPosts] = useState<ProfilePost[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<ProfilePost[]>(
          `/profile/${username}/posts`
        );
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
        const date = new Date(createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

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
