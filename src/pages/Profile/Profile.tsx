import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import {
  fetchUsers,
  selectUserById,
  selectUsersError,
  selectUsersStatus,
} from '../../store/usersSlice';
import Container from '../../components/ui/Container';
import UserAvatarImage from '../../components/ui/UserAvatarImage';
import PageTitle from '../../constants/pageTitle';
import Tabs from '../../components/ui/Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RequestStatus from '../../constants/requestStatus';
import Loading from '../../components/ui/Loading';
import { selectCurrentUser } from '../../store/authSlice';
import Button from '../../components/ui/Button';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../firebase';

type ProfileProps = {
  pageTitle: PageTitle.Profile;
};

export default function Profile({ pageTitle }: ProfileProps) {
  const { authorId } = useParams<{ authorId: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    selectUserById(state, authorId as string)
  );

  const currentUser = useAppSelector(selectCurrentUser);
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let content;

  if (!user) return <p>User not found</p>;

  if (usersStatus === RequestStatus.Pending) {
    content = <Loading className="mx-auto" />;
  }

  if (usersStatus === RequestStatus.Resolved) {
    content = (
      <>
        <div className="flex flex-col justify-center items-center gap-4">
          <UserAvatarImage src={user?.photoURL ?? null} size="large" />
          <h2 className="text-2xl">{user?.username}</h2>
        </div>
        <Outlet />
      </>
    );
  }

  if (usersStatus === RequestStatus.Rejected) {
    content = <p>{usersError}</p>;
  }

  const tabs = [
    { name: 'Posts', to: `/profile/${authorId}`, root: true },
    { name: 'Followers', to: `/profile/${authorId}/followers` },
    { name: 'Following', to: `/profile/${authorId}/following` },
  ];

  const handleFollow = async () => {
    const docRef = await addDoc(collection(db, 'follow'), {
      author: user.id,
      follower: currentUser.id,
    });
  };

  return (
    <Page title={pageTitle}>
      <Container size="narrow">
        <div className="mb-10 mt-10">
          <Tabs tabs={tabs} />
          {currentUser.id !== user?.id && (
            <Button onClick={handleFollow}>Subscribe</Button>
          )}
          {content}
        </div>
      </Container>
    </Page>
  );
}
