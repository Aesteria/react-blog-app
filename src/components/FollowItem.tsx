import { Link } from 'react-router-dom';
import useUserProfile from '../pages/Profile/hooks/useUserProfile';
import UserAvatarImage from './ui/UserAvatarImage';

type FollowItemProps = {
  usernameId: string;
};

export default function FollowItem({ usernameId }: FollowItemProps) {
  const { user } = useUserProfile(usernameId);

  if (!user) return <p>User not found</p>;

  return (
    <Link
      to={`/profile/${user.id}`}
      className="flex items-center gap-3 transition-backgroundColor hover:bg-slate-200 p-4 rounded-sm"
    >
      <UserAvatarImage src={user.photoURL} />
      {user.username}
    </Link>
  );
}
