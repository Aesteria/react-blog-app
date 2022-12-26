import { useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/authSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import Page from '../components/Page';
import BlogCardList from '../components/BlogCards/BlogCardList';
import Container from '../components/ui/Container';

const welcomeScreen = {
  title: 'Remember Writing?',
  body: `Are you sick of short tweets and impersonal “shared” posts that are
  reminiscent of the late 90’s email forwards? We believe getting back
  to actually writing is the key to enjoying the internet again.`,
  cover: 'coding',
};

type HomeProps = {
  pageTitle: PageTitle.Home;
};

export default function Home({ pageTitle }: HomeProps) {
  const isAuth = useAppSelector(selectIsUserAuthenticated);

  return (
    <Page title={pageTitle}>
      <div>{!isAuth && <WelcomeScreen data={welcomeScreen} />}</div>
      <Container>
        <BlogCardList />
      </Container>
    </Page>
  );
}
