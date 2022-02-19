import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatchContext, AppStateContext } from '../../context/app-context';
import Page from '../Page/Page';

type PostId = string;

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useContext(AppDispatchContext);
  const { user } = useContext(AppStateContext);

  const submitPostHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<PostId>('/create-post', {
        title,
        body,
        token: user.token,
      });
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
            onChange={(event) => setTitle(event.target.value)}
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
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default CreatePost;
