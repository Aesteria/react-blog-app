import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiService } from '../../api/ApiService';
import LoadingDotsIcon from '../../components/LoadingDotsIcon/LoadingDotsIcon';
import { AppStateContext } from '../../context/appContext';
import { ProfileFollow } from '../../types/profile';

const ProfileFollows = ({
  requestType,
}: {
  requestType: 'fetchProfileFollowers' | 'fetchProfileFollowing';
}) => {
  const [follows, setFollows] = useState<ProfileFollow[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username: profileUsername } = useParams();
  const {
    loggedIn,
    user: { username: currentUsername },
  } = useContext(AppStateContext);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchFollows = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService[requestType](profileUsername, {
          cancelToken: source.token,
        });
        setFollows(response.data);
        setIsLoading(false);
      } catch (e: any) {
        console.log('There was a problem fetching profile posts');
      }
    };

    fetchFollows();

    return () => {
      source.cancel('The request was cancelled');
    };
  }, [profileUsername, requestType]);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  const isCurrentUserProfileAndNoResults =
    !Boolean(follows.length) && loggedIn && profileUsername === currentUsername;
  const isNotCurrentUserProfileAndNoResults =
    !Boolean(follows.length) && profileUsername !== currentUsername;
  const isGuestAndShowFollowers =
    !loggedIn && requestType === 'fetchProfileFollowers';

  return (
    <div className="list-group">
      {follows.map(({ avatar, username }) => {
        return (
          <Link
            key={username}
            to={`/profile/${username}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={avatar} alt="profile avatar" />{' '}
            {username}
          </Link>
        );
      })}
      {isCurrentUserProfileAndNoResults && (
        <p className="lead text-muted text-center">
          {requestType === 'fetchProfileFollowers'
            ? "You don't have any followers yet"
            : "You aren't following anyone yet"}
        </p>
      )}
      {isNotCurrentUserProfileAndNoResults && (
        <p className="lead text-muted text-center">
          {requestType === 'fetchProfileFollowers'
            ? `${profileUsername} doesn't have any followers yet.`
            : `${profileUsername} isn't following anyone yet`}
        </p>
      )}
      {isGuestAndShowFollowers && (
        <p className="lead text-muted text-center mt-4">
          If you want to follow you need to <Link to="/">sign up</Link> for an
          account first.{' '}
        </p>
      )}
    </div>
  );
};

export default ProfileFollows;
