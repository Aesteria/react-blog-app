import axios, { CancelTokenSource } from 'axios';
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { Post } from '../../types/Post';
import Page from '../Page/Page';

type EditPostState = {
  body: {
    value: string;
    hasError: boolean;
    errorMessage: string;
  };
  title: {
    value: string;
    hasError: boolean;
    errorMessage: string;
  };
  isFetching: boolean;
  isSaving: boolean;
  id: string;
  submitCancelToken: CancelTokenSource;
};

type EditPostFetch = {
  type: 'fetchResolved';
  payload: Post;
};

type EditPostTitle = {
  type: 'changeTitle';
  payload: string;
};

type EditPostBody = {
  type: 'changeBody';
  payload: string;
};

type SavePostResolved = {
  type: 'saveResolved';
};

type SavePostPending = {
  type: 'savePending';
};

type SetCancelSource = {
  type: 'setCancelSource';
  payload: CancelTokenSource;
};

type EditPostAction =
  | EditPostFetch
  | EditPostTitle
  | EditPostBody
  | SavePostResolved
  | SavePostPending
  | SetCancelSource;

const reducer = (draft: EditPostState, action: EditPostAction): void => {
  switch (action.type) {
    case 'fetchResolved':
      draft.body.value = action.payload.body;
      draft.title.value = action.payload.title;
      draft.isFetching = false;
      break;
    case 'changeBody':
      draft.body.value = action.payload;
      break;
    case 'changeTitle':
      draft.title.value = action.payload;
      break;
    case 'saveResolved':
      draft.isSaving = false;
      break;
    case 'savePending':
      draft.isSaving = true;
      break;
    case 'setCancelSource':
      draft.submitCancelToken = action.payload;
      break;
    default:
      break;
  }
};

const EditPost = () => {
  const [state, dispatch] = useImmerReducer(reducer, {
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
  });
  const { user } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);

  const submitEditPostHandler = (event: FormEvent) => {
    event.preventDefault();

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
        appDispatch({ type: 'ADD_FLASH_MESSAGE', payload: 'Post was updated' });
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
        const response = await axios.get<Post>(`post/${state.id}`, {
          cancelToken: source.token,
        });
        dispatch({ type: 'fetchResolved', payload: response.data });
      } catch (e: any) {
        console.log(e.message || 'There was a problem');
      }
    };

    fetchData();

    return () => {
      source.cancel('Fetch post data was cancelled.');
    };
  }, [state.id, dispatch]);

  // Cleanup function when post was saved
  useEffect(() => {
    if (state.submitCancelToken?.token) {
      return () => {
        state.submitCancelToken.cancel('Meow...');
      };
    }
  }, [state.submitCancelToken]);

  if (state.isFetching) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }

  return (
    <Page title="Edit Post">
      <form onSubmit={submitEditPostHandler}>
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
            onChange={(e) =>
              dispatch({ type: 'changeTitle', payload: e.target.value })
            }
          />
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
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default EditPost;
