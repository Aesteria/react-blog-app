import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../../context/appContext';
import { ProfileData } from '../../types/Profile';
import Page from '../Page/Page';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
  const [userProfile, setUserProfile] = useState<ProfileData>({
    profileUsername: '...',
    profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
    isFollowing: false,
    counts: {
      followerCount: 0,
      followingCount: 0,
      postCount: 0,
    },
  });
  const { username } = useParams();
  const { user } = useContext(AppStateContext);

  const {
    profileAvatar,
    profileUsername,
    counts: { followerCount, followingCount, postCount },
  } = userProfile;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.post<ProfileData>(
          `/profile/${username}`,
          {
            token: user.token,
          },
          {
            cancelToken: source.token,
          }
        );
        setUserProfile(response.data);
      } catch (e) {
        console.log('There was a problem loading profile');
      }
    };

    fetchData();

    return () => {
      source.cancel('The request was cancelled');
    };
  }, [username, user.token]);

  return (
    <Page title="Profile">
      <h2>
        <img
          className="avatar-small"
          src={profileAvatar}
          alt="Profile avatar"
        />{' '}
        {profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
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
