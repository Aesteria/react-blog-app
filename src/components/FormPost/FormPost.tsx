import React, { ChangeEvent, FormEvent } from 'react';

type FormPostProps = {
  submitHandler: (event: FormEvent) => void;
  titleChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  titleBlurHandler: () => void;
  titleHasErrors: boolean;
  titleErrorMessage: string;
  title: string;
  bodyChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  bodyBlurHandler: () => void;
  bodyHasErrors: boolean;
  bodyErrorMessage: string;
  body: string;
  formIsValid: boolean;
};

const FormPost = (props: FormPostProps) => {
  const {
    submitHandler,
    titleChangeHandler,
    titleBlurHandler,
    titleHasErrors,
    titleErrorMessage,
    title,
    bodyChangeHandler,
    bodyBlurHandler,
    bodyHasErrors,
    bodyErrorMessage,
    body,
    formIsValid,
  } = props;

  return (
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

      <button className="btn btn-primary" disabled={!formIsValid}>
        Save Updates
      </button>
    </form>
  );
};

export default FormPost;
