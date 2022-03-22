import axios, { CancelTokenSource } from 'axios';
import { FormEvent, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { useInput } from '../../hooks/useInput';
import { editPostReducer } from '../../reducers/editPostReducer/editPostReducer';
import { Post } from '../../types/post';
import { isNotEmpty } from '../../utils/validate';
import NotFound from '../NotFound/NotFound';
import Page from '../Page/Page';

const EditPost = () => {
  const [state, dispatch] = useImmerReducer(editPostReducer, {
    isFetching: true,
    isSaving: false,
    id: useParams().id as string,
    submitCancelToken: {} as CancelTokenSource,
    notFound: false,
    value: '',
    body: '',
  });
  const {
    value: title,
    error: titleErrorMessage,
    valueHasErrors: titleHasErrors,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    valueIsValid: titleIsValid,
    setValue: setTitle,
  } = useInput('title', isNotEmpty);

  const {
    value: body,
    error: bodyErrorMessage,
    valueHasErrors: bodyHasErrors,
    valueChangeHandler: bodyChangeHandler,
    valueBlurHandler: bodyBlurHandler,
    valueIsValid: bodyIsValid,
    setValue: setBody,
  } = useInput('body', isNotEmpty);
  const { user } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);
  const navigate = useNavigate();

  let formIsValid = false;

  if (titleIsValid && bodyIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // create axios cancel token to abort request when component is unmounted
    const cancelTokenSource = axios.CancelToken.source();
    dispatch({ type: 'setCancelSource', payload: cancelTokenSource });

    const fetchData = async () => {
      try {
        dispatch({ type: 'savePending' });
        await ApiService.editPost(
          state.id,
          {
            title: title,
            body: body,
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

        const checkPermission = (data: Post) => {
          const isAuthor = data.author.username === user.username;

          if (isAuthor) {
            setTitle(response.data.title);
            setBody(response.data.body);
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
  }, [
    state.id,
    dispatch,
    user.username,
    appDispatch,
    navigate,
    setBody,
    setTitle,
  ]);

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

      <form className="mt-3" onSubmit={submitHandler}>
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
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleHasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {titleErrorMessage}
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
            value={body}
            onChange={bodyChangeHandler}
            onBlur={bodyBlurHandler}
          />
          {bodyHasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {bodyErrorMessage}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary"
          disabled={!formIsValid || state.isSaving}
        >
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default EditPost;
