import axios, { CancelTokenSource } from 'axios';
import { FormEvent, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { editPostReducer } from '../../reducers/editPostReducer/editPostReducer';
import { Post } from '../../types/post';
import NotFound from '../NotFound/NotFound';
import Page from '../Page/Page';

const EditPost = () => {
  const [state, dispatch] = useImmerReducer(editPostReducer, {
    body: {
      value: '',
      hasError: false,
      errorMessage: '',
    },
    title: {
      value: '',
      hasError: false,
      errorMessage: '',
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id as string,
    submitCancelToken: {} as CancelTokenSource,
    notFound: false,
  });
  const { user } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);
  const navigate = useNavigate();

  let formIsValid = false;

  if (!state.body.hasError && !state.title.hasError) {
    formIsValid = true;
  }

  const submitEditPostHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (!state.title.hasError) {
      // create axios cancel token to abort request when component is unmounted
      const cancelTokenSource = axios.CancelToken.source();
      dispatch({ type: 'setCancelSource', payload: cancelTokenSource });

      const fetchData = async () => {
        try {
          dispatch({ type: 'savePending' });
          const response = await axios.post<Post>(
            `post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: user.token,
            },
            {
              cancelToken: cancelTokenSource.token,
            }
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
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get<Post>(`post/${state.id}`, {
          cancelToken: source.token,
        });

        const checkPermission = (data: Post) => {
          const isAuthor = response.data.author.username === user.username;

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

      <form className="mt-3" onSubmit={submitEditPostHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            value={state.title.value}
            onChange={(e) => {
              dispatch({ type: 'changeTitle', payload: e.target.value });
            }}
          />
          {state.title.hasError && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.title.errorMessage}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            value={state.body.value}
            onChange={(e) =>
              dispatch({ type: 'changeBody', payload: e.target.value })
            }
          />
          {state.body.hasError && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.body.errorMessage}
            </div>
          )}
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default EditPost;
