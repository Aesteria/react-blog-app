import { Outlet, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Container from '../../components/ui/Container';
import PageTitle from '../../constants/pageTitle';
import RequestStatus from '../../constants/requestStatus';
import Loading from '../../components/ui/Loading';
import useUserProfile from './hooks/useUsersProfile';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/authSlice';
import ProfileInfo from './ProfileInfo';
import ProfileTabs from './ProfileTabs';

type ProfileProps = {
  pageTitle: PageTitle.Profile;
};

export default function Profile({ pageTitle }: ProfileProps) {
  const { authorId } = useParams<{ authorId: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const { user, usersError, usersStatus } = useUserProfile(authorId);

  let content;

  if (usersStatus === RequestStatus.Pending) {
    content = <Loading className="mx-auto" />;
  } else if (usersStatus === RequestStatus.Resolved && user) {
    content = (
      <>
        <ProfileInfo currentUser={currentUser} user={user} />
        <Outlet />
      </>
    );
  } else if (usersStatus === RequestStatus.Rejected) {
    content = <p>{usersError}</p>;
  }

  return (
    <Page title={pageTitle}>
      <Container size="narrow">
        <div className="mb-10 mt-10">
          <ProfileTabs authorId={authorId as string} />
          {content}
        </div>
      </Container>
    </Page>
  );
}
