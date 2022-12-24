import Button from '../../components/ui/Button';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import { UserProfile } from '../../types/profile';
import useHandleFollow from './hooks/useHandleFollow';

type ProfileInfoProps = {
  user: UserProfile;
};

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const {
    handleFollow,
    showFollowButton,
    showUnfollowButton,
    handleUnfollow,
    isLoading,
  } = useHandleFollow(user.id);

  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-10">
      <UserAvatarImage src={user.photoURL} size="large" />
      <h2 className="text-2xl">{user.username}</h2>
      {showFollowButton && (
        <Button disabled={isLoading} onClick={handleFollow}>
          Follow
        </Button>
      )}
      {showUnfollowButton && (
        <Button disabled={isLoading} onClick={handleUnfollow}>
          Unfollow
        </Button>
      )}
    </div>
  );
}
