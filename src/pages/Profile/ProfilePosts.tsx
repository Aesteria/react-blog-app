import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { Post } from '../../types/post';
import { formatDate } from '../../utils/formatDate';

const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPosts = async () => {
      try {
        const response = await ApiService.fetchProfilePosts(username, {
          cancelToken: source.token,
        });
        setPosts(response.data);
        setIsLoading(false);
      } catch (e: any) {
        console.log('There was a problem fetching profile posts');
      }
    };

    fetchPosts();

    return () => {
      source.cancel('The request was cancelled');
    };
  }, [username]);

  if (isLoading) {
    return <LoadingDotsIcon />;
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
