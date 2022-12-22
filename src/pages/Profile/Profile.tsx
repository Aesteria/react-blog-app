import { addDoc, collection } from 'firebase/firestore';
import { Outlet, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Container from '../../components/ui/Container';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import PageTitle from '../../constants/pageTitle';
import Tabs from '../../components/ui/Tabs';
import RequestStatus from '../../constants/requestStatus';
import Loading from '../../components/ui/Loading';
import Button from '../../components/ui/Button';
import { db } from '../../firebase';
import useUserProfile from './hooks/useUserProfile';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/authSlice';

type ProfileProps = {
  pageTitle: PageTitle.Profile;
};

export default function Profile({ pageTitle }: ProfileProps) {
  const { authorId } = useParams<{ authorId: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const { user, userError, userStatus } = useUserProfile(authorId);

  let content;

  if (userStatus === RequestStatus.Pending) {
    content = <Loading className="mx-auto" />;
  }

  if (userStatus === RequestStatus.Resolved && user) {
    const handleFollow = async () => {
      const docRef = await addDoc(collection(db, 'follows'), {
        author: user.id,
        follower: currentUser.id,
      });
    };

    content = (
      <>
        <div className="flex flex-col justify-center items-center gap-4">
          <UserAvatarImage src={user.photoURL} size="large" />
          <h2 className="text-2xl">{user.username}</h2>
        </div>
        {currentUser.id !== user.id && (
          <Button onClick={handleFollow}>Subscribe</Button>
        )}
        <Outlet />
      </>
    );
  }

  if (userStatus === RequestStatus.Rejected) {
    content = <p>{userError}</p>;
  }

  const tabs = [
    { name: 'Posts', to: `/profile/${authorId}`, root: true },
    { name: 'Followers', to: `followers` },
    { name: 'Following', to: `following` },
  ];

  return (
    <Page title={pageTitle}>
      <Container size="narrow">
        <div className="mb-10 mt-10">
          <Tabs tabs={tabs} />
          {content}
        </div>
      </Container>
    </Page>
  );
}
