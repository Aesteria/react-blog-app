import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { Post } from '../../types/post';
import { formatDate } from '../../utils/formatDate';
import Page from '../Page/Page';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import NotFound from '../NotFound/NotFound';
import { ApiService } from '../../api/ApiService';

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({} as Post);
  const { id } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPost = async () => {
      try {
        const response = await ApiService.fetchPost(id, {
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

  if (!isLoading && !post) {
    return <NotFound />;
  }

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
          <Link
            to={`/post/${post._id}/edit`}
            className="text-primary mr-2"
            data-tip="Edit"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <ReactTooltip />{' '}
          <a className="delete-post-button text-danger" data-tip="Delete">
            <i className="fas fa-trash"></i>
          </a>
          <ReactTooltip />
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

      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  );
};

export default ViewSinglePost;
