import Container from '../components/ui/Container';
import PageTitle from '../constants/pageTitle';
import Page from '../components/Page';

type PostsProps = {
  pageTitle: PageTitle.Posts;
};

export default function Posts({ pageTitle }: PostsProps) {
  return (
    <Page title={pageTitle}>
      <div className="bg-slate-100">
        <Container size="wide">Hello Posts Page</Container>
      </div>
    </Page>
  );
}
