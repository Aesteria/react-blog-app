import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { useInput } from '../../hooks/useInput';
import { isNotEmpty } from '../../utils/validate';
import Page from '../Page/Page';

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    value: title,
    error: titleErrorMessage,
    valueHasErrors: titleHasErrors,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    valueIsValid: titleIsValid,
  } = useInput('title', isNotEmpty);

  const {
    value: body,
    error: bodyErrorMessage,
    valueHasErrors: bodyHasErrors,
    valueChangeHandler: bodyChangeHandler,
    valueBlurHandler: bodyBlurHandler,
    valueIsValid: bodyIsValid,
  } = useInput('body', isNotEmpty);

  const dispatch = useContext(AppDispatchContext);
  const {
    user: { token },
  } = useContext(AppStateContext);

  let formIsValid = false;

  if (titleIsValid && bodyIsValid) {
    formIsValid = true;
  }

  const submitPostHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await ApiService.createPost({ title, body, token });
      dispatch({
        type: 'ADD_FLASH_MESSAGE',
        payload: 'Congrats, you succesfully created a post',
      });
      // change url to see post that was created.
      navigate(`/post/${response.data}`);

      console.log('Post was succesfully created.');
    } catch (e) {
      console.log('There was an error');
    }
  };

  return (
    <Page title="Create New Post">
      <form onSubmit={submitPostHandler}>
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
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            value={title}
          />
          {titleHasErrors && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {titleErrorMessage}
            </p>
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
            onChange={bodyChangeHandler}
            onBlur={bodyBlurHandler}
            value={body}
          ></textarea>
          {bodyHasErrors && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {bodyErrorMessage}
            </p>
          )}
        </div>

        <button disabled={!formIsValid} className="btn btn-primary">
          Save New Post
        </button>
      </form>
    </Page>
  );
};

export default CreatePost;
