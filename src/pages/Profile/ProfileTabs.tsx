import Tabs from '../../components/ui/Tabs';
import { useAppSelector } from '../../store/hooks';
import { selectPostsByAuthorId } from '../../store/postsSlice';
import useFollowers from './hooks/useFollowers';
import useFollowing from '../../hooks/useFollowing';

type ProfileTabsProps = {
  authorId: string;
};

export default function ProfileTabs({ authorId }: ProfileTabsProps) {
  const postsCount = useAppSelector((state) =>
    selectPostsByAuthorId(state, authorId ?? '')
  ).length;
  const { followers } = useFollowers(authorId);
  const { following } = useFollowing(authorId);

  const tabs = [
    {
      name: 'Posts',
      to: '',
      count: postsCount,
      root: true,
    },
    { name: 'Followers', to: 'followers', count: followers.length },
    { name: 'Following', to: 'following', count: following.length },
  ];

  return <Tabs tabs={tabs} />;
}
