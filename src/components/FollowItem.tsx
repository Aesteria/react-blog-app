import { Link } from 'react-router-dom';
import useUsersProfile from '../pages/Profile/hooks/useUsersProfile';
import UserAvatarImage from './ui/UserAvatarImage';

type FollowItemProps = {
  usernameId: string;
};

export default function FollowItem({ usernameId }: FollowItemProps) {
  const { user } = useUsersProfile(usernameId);

  return (
    <Link
      to={`/profile/${user?.id}/feed`}
      className="flex items-center gap-3 transition-backgroundColor hover:bg-slate-200 p-4 rounded-sm"
    >
      <UserAvatarImage src={user?.photoURL ?? null} size="small" />
      <h3 className="text-sm font-medium">{user?.username}</h3>
    </Link>
  );
}
