import { NavLink } from 'react-router-dom';

type ProfileNavigationProps = {
  username: string | undefined;
  postCount: number;
  followerCount: number;
  followingCount: number;
};

const ProfileNavigation = ({
  followerCount,
  username,
  postCount,
  followingCount,
}: ProfileNavigationProps) => {
  return (
    <div className="profile-nav nav nav-tabs pt-2 mb-4">
      <NavLink to={`/profile/${username}`} className="nav-item nav-link" end>
        Posts: {postCount}
      </NavLink>
      <NavLink
        to={`/profile/${username}/followers`}
        className="nav-item nav-link"
      >
        Followers: {followerCount}
      </NavLink>
      <NavLink
        to={`/profile/${username}/following`}
        className="nav-item nav-link"
      >
        Following: {followingCount}
      </NavLink>
    </div>
  );
};

export default ProfileNavigation;
