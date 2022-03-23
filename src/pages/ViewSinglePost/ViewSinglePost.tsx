import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { Post } from '../../types/post';
import { formatDate } from '../../utils/formatDate';
import Page from '../Page/Page';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import NotFound from '../NotFound/NotFound';
import { ApiService } from '../../api/ApiService';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({} as Post);
  const { id } = useParams();
  const {
    user: { username, token },
    loggedIn,
  } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);
  const navigate = useNavigate();

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

  // Check permission to view delete and edit post buttons
  const isOwner = () => {
    if (loggedIn) {
      return username === post.author.username;
    }

    return false;
  };

  const deletePostHandler = async () => {
    try {
      const response = await axios.delete(`/post/${id}`, { data: { token } });

      if (response.data === 'Success') {
        appDispatch({
          type: 'ADD_FLASH_MESSAGE',
          payload: 'Post was succesfully deleted',
        });
        navigate(`/profile/${username}`);
      }
    } catch (e) {}
  };

  return (
    <Page title="Fake Post Title">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link
              to={`/post/${post._id}/edit`}
              className="text-primary mr-2"
              data-tip="Edit"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip />{' '}
            <a
              className="delete-post-button text-danger"
              data-tip="Delete"
              onClick={deletePostHandler}
            >
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip />
          </span>
        )}
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
