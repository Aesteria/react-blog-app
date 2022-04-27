import axios, { CancelTokenSource } from 'axios';
import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import FormPost from '../../components/FormPost/FormPost';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { editPostReducer } from '../../reducers/editPostReducer/editPostReducer';
import { Post } from '../../types/post';
import NotFound from '../NotFound/NotFound';
import Page from '../Page/Page';

const EditPost = () => {
  const [state, dispatch] = useImmerReducer(editPostReducer, {
    isFetching: true,
    isSaving: false,
    id: useParams().id as string,
    submitCancelToken: {} as CancelTokenSource,
    notFound: false,
    titleFetched: '',
    bodyFetched: '',
  });

  const { user } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);
  const navigate = useNavigate();

  const submitHandler = (title: string, body: string) => {
    // create axios cancel token to abort request when component is unmounted
    const cancelTokenSource = axios.CancelToken.source();
    dispatch({ type: 'setCancelSource', payload: cancelTokenSource });

    const fetchData = async () => {
      try {
        dispatch({ type: 'savePending' });
        await ApiService.editPost(
          state.id,
          {
            title,
            body,
            token: user.token,
          },
          { cancelToken: cancelTokenSource.token }
        );
        dispatch({ type: 'saveResolved' });
        appDispatch({
          type: 'ADD_FLASH_MESSAGE',
          payload: 'Post was updated',
        });
      } catch (e: any) {
        console.log(e.message || 'There was a problem while submit form');
      }
    };

    fetchData();
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await ApiService.fetchPost(state.id, {
          cancelToken: source.token,
        });

        // If someone go to url for post edit and doesn't have permission
        // make redirect to HomePage
        const checkPermission = (data: Post) => {
          const isAuthor = data.author.username === user.username;

          if (isAuthor) {
            dispatch({ type: 'fetchResolved', payload: response.data });
          } else {
            appDispatch({
              type: 'ADD_FLASH_MESSAGE',
              payload: "You don't have permission to edit that post",
            });
            navigate('/');
          }
        };

        if (response.data) {
          checkPermission(response.data);
        } else {
          dispatch({ type: 'notFound' });
        }
      } catch (e: any) {
        console.log(e.message || 'There was a problem');
      }
    };

    fetchData();

    return () => {
      source.cancel('Fetch post data was cancelled.');
    };
  }, [state.id, dispatch, user.username, appDispatch, navigate]);

  // Cleanup function when post was saved
  useEffect(() => {
    if (state.submitCancelToken?.token) {
      return () => {
        state.submitCancelToken.cancel('Meow...');
      };
    }
  }, [state.submitCancelToken]);

  if (state.notFound) {
    return <NotFound />;
  }

  if (state.isFetching) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }

  return (
    <Page title="Edit Post">
      <Link className="small font-weight-bold" to={`/post/${state.id}`}>
        &laquo; Back to viewing post
      </Link>

      <FormPost
        defaultTitle={state.titleFetched}
        defaultBody={state.bodyFetched}
        isEdit={true}
        onSubmit={submitHandler}
        isSaving={state.isSaving}
      />
    </Page>
  );
};

export default EditPost;
