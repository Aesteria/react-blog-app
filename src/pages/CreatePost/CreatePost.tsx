import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import FormPost from '../../components/FormPost/FormPost';
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

  const submitHandler = async (event: FormEvent) => {
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
      <FormPost
        submitHandler={submitHandler}
        titleChangeHandler={titleChangeHandler}
        titleBlurHandler={titleBlurHandler}
        titleHasErrors={titleHasErrors}
        titleErrorMessage={titleErrorMessage}
        title={title}
        bodyChangeHandler={bodyChangeHandler}
        bodyBlurHandler={bodyBlurHandler}
        bodyHasErrors={bodyHasErrors}
        bodyErrorMessage={bodyErrorMessage}
        body={body}
        formIsValid={formIsValid}
      />
    </Page>
  );
};

export default CreatePost;
