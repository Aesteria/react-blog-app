import Button from '../../components/ui/Button';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import { UserProfile } from '../../types/profile';
import { CurrentUser } from '../../types/user';
import useHandleFollow from './hooks/useHandleFollow';

type ProfileInfoProps = {
  user: UserProfile;
  currentUser: CurrentUser;
};

export default function ProfileInfo({ currentUser, user }: ProfileInfoProps) {
  const { handleFollow, showFollowButton, showUnfollowButton, handleUnfollow } =
    useHandleFollow(user.id, currentUser.id);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <UserAvatarImage src={user.photoURL} size="large" />
        <h2 className="text-2xl">{user.username}</h2>
      </div>
      {showFollowButton && <Button onClick={handleFollow}>Follow</Button>}
      {showUnfollowButton && <Button onClick={handleUnfollow}>Unfollow</Button>}
    </>
  );
}
