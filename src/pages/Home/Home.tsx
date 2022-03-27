import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import PostItem from '../../components/PostItem/PostItem';
import { AppStateContext } from '../../context/appContext';
import { Post } from '../../types/post';
import Page from '../Page/Page';

type InitialState = {
  isLoading: boolean;
  feed: Post[] | [];
};

const Home = () => {
  const [state, setState] = useImmer<InitialState>({
    isLoading: true,
    feed: [],
  });
  const { user } = useContext(AppStateContext);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setState((draft) => {
        draft.isLoading = true;
      });
      try {
        const response = await ApiService.getHomeFeed(user.token, {
          cancelToken: source.token,
        });
        setState((draft) => {
          draft.feed = response.data;
          draft.isLoading = false;
        });
      } catch (e) {
        console.log('There was a problem or request was cancelled');
        setState((draft) => {
          draft.isLoading = false;
        });
      }
    };

    fetchData();

    return () => {
      source.cancel('The request was cancelled');
    };
  }, [user.token, setState]);

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Your Feed">
      {Boolean(state.feed.length) && (
        <>
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <div className="list-group">
            {state.feed.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
      {!Boolean(state.feed.length) && (
        <>
          <h2 className="text-center">
            Hello <strong>{user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">
            Your feed displays the latest posts from the people you follow. If
            you don&rsquo;t have any friends to follow that&rsquo;s okay; you
            can use the &ldquo;Search&rdquo; feature in the top menu bar to find
            content written by people with similar interests and then follow
            them.
          </p>
        </>
      )}
    </Page>
  );
};

export default Home;
