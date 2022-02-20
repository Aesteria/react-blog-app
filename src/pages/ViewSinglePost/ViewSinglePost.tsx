import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { Post } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';
import Page from '../Page/Page';

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({} as Post);
  const { id } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`/post/${id}`, {
          cancelToken: source.token,
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log('There was a problem with fetching Post');
      }
    };

    fetchPost();

    return () => {
      source.cancel('The request was cancelled.');
    };
  }, [id]);

  if (isLoading) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }

  const dateFormatted = formatDate(post.createdDate);

  return (
    <Page title="Fake Post Title">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img
            className="avatar-tiny"
            src={post.author.avatar}
            alt="user avatar"
          />
        </Link>
        Posted by{' '}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{' '}
        on {dateFormatted}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
};

export default ViewSinglePost;
