import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import FormPost from '../../components/FormPost/FormPost';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import Page from '../Page/Page';

const CreatePost = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const dispatch = useContext(AppDispatchContext);
  const {
    user: { token },
  } = useContext(AppStateContext);

  const submitHandler = (title: string, body: string) => {
    const fetchData = async () => {
      try {
        setIsSaving(true);
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

    fetchData();
  };

  return (
    <Page title="Create New Post">
      <FormPost onSubmit={submitHandler} isEdit={false} isSaving={isSaving} />
    </Page>
  );
};

export default CreatePost;
