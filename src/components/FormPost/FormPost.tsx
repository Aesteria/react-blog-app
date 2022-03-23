import { FormEvent } from 'react';
import { useInput } from '../../hooks/useInput';
import { isNotEmpty } from '../../utils/validate';

type FormPostProps = {
  isEdit: boolean;
  onSubmit: (title: string, body: string) => void;
  defaultTitle?: string;
  defaultBody?: string;
  isSaving: boolean;
};

const FormPost = (props: FormPostProps) => {
  const { isEdit, onSubmit, defaultTitle, defaultBody, isSaving } = props;
  const {
    value: title,
    error: titleErrorMessage,
    valueHasErrors: titleHasErrors,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    valueIsValid: titleIsValid,
  } = useInput('title', isNotEmpty, defaultTitle);
  const {
    value: body,
    error: bodyErrorMessage,
    valueHasErrors: bodyHasErrors,
    valueChangeHandler: bodyChangeHandler,
    valueBlurHandler: bodyBlurHandler,
    valueIsValid: bodyIsValid,
  } = useInput('body', isNotEmpty, defaultBody);

  let formIsValid = false;
  if (titleIsValid && bodyIsValid) {
    formIsValid = true;
  }

  const postSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    onSubmit(title, body);
  };

  return (
    <form className="mt-3" onSubmit={postSubmitHandler}>
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

      <button className="btn btn-primary" disabled={!formIsValid || isSaving}>
        {isEdit ? 'Save Updates' : 'Create Post'}
      </button>
    </form>
  );
};

export default FormPost;
