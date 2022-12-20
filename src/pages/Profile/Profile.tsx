import { Outlet, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Container from '../../components/ui/Container';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import PageTitle from '../../constants/pageTitle';
import UserDefaultAvatar from '../../assets/profile.png';
import Tabs from '../../components/ui/Tabs';
import { useAppSelector } from '../../store/hooks';
import { selectPostsByAuthorName } from '../../store/postsSlice';

type ProfileProps = {
  pageTitle: PageTitle.Profile;
};

export default function Profile({ pageTitle }: ProfileProps) {
  const { authorName } = useParams<{ authorName: string }>();
  const posts = useAppSelector((state) =>
    selectPostsByAuthorName(state, authorName ?? '')
  );

  if (!posts.length) return <p>No posts found!</p>;

  const tabs = [
    { name: 'Posts', to: `/profile/${authorName}`, root: true },
    { name: 'Followers', to: `/profile/${authorName}/followers` },
    { name: 'Following', to: `/profile/${authorName}/following` },
  ];

  return (
    <Page title={pageTitle}>
      <Container size="narrow">
        <div className="mb-10 mt-10">
          <Tabs tabs={tabs} />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <UserAvatarImage src={UserDefaultAvatar} size="large" />
          <h2 className="text-2xl">{authorName}</h2>
        </div>
        <Outlet />
      </Container>
    </Page>
  );
}
