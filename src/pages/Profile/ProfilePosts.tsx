import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import PostItem from '../../components/PostItem/PostItem';
import { Post } from '../../types/post';

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
      {posts.map((post) => (
        <PostItem post={post} isAuthor key={post._id} />
      ))}
    </div>
  );
};

export default ProfilePosts;
