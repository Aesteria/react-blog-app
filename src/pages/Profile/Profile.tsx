import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import { AppStateContext } from '../../context/appContext';
import Page from '../Page/Page';
import ProfilePosts from './ProfilePosts';
import { useImmer } from 'use-immer';

const Profile = () => {
  const [state, setState] = useImmer({
    profileData: {
      profileUsername: '...',
      profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
      isFollowing: false,
      counts: {
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
      },
    },
    isFollowLoading: false,
  });
  const { username } = useParams();
  const {
    user: { token, username: currentUsername },
    loggedIn,
  } = useContext(AppStateContext);

  const {
    profileAvatar,
    profileUsername,
    counts: { followerCount, followingCount, postCount },
  } = state.profileData;

  const toggleFollowHandler = (type: 'startFollow' | 'stopFollow') => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setState((draft) => {
        draft.isFollowLoading = true;
      });
      try {
        await ApiService[type](state.profileData.profileUsername, token, {
          cancelToken: source.token,
        });
        setState((draft) => {
          draft.isFollowLoading = false;
          draft.profileData.isFollowing = type === 'startFollow' ? true : false;
          type === 'startFollow'
            ? draft.profileData.counts.followerCount++
            : draft.profileData.counts.followerCount--;
        });
      } catch (e) {
        console.log('There was a problem or request was cancelled');
        setState((draft) => {
          draft.isFollowLoading = false;
        });
      }
    };

    fetchData();

    return () => {
      source.cancel('The request was cancelled');
    };
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await ApiService.fetchUserProfile(
          username,
          { token },
          { cancelToken: source.token }
        );
        setState((draft) => {
          draft.profileData = response.data;
        });
      } catch (e) {
        console.log('There was a problem loading profile');
      }
    };

    fetchData();

    return () => {
      source.cancel('The request was cancelled');
    };
  }, [username, token, setState]);

  const showFollow =
    loggedIn &&
    state.profileData.profileUsername !== '...' &&
    currentUsername !== username &&
    !state.profileData.isFollowing;

  const showUnfollow =
    loggedIn &&
    state.profileData.profileUsername !== '...' &&
    currentUsername !== username &&
    state.profileData.isFollowing;

  return (
    <Page title="Profile">
      <h2>
        <img
          className="avatar-small"
          src={profileAvatar}
          alt="Profile avatar"
        />{' '}
        {profileUsername}
        {showFollow && (
          <button
            onClick={() => toggleFollowHandler('startFollow')}
            className="btn btn-primary btn-sm ml-2"
            disabled={state.isFollowLoading}
          >
            Follow <i className="fas fa-user-plus"></i>
          </button>
        )}
        {showUnfollow && (
          <button
            onClick={() => toggleFollowHandler('stopFollow')}
            className="btn btn-danger btn-sm ml-2"
            disabled={state.isFollowLoading}
          >
            Unfollow <i className="fas fa-user-times"></i>
          </button>
        )}
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
};

export default Profile;
