import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import PageTitle from '../constants/pageTitle';
import { selectIsUserAuthenticated } from '../store/authSlice';
import WelcomeScreen from '../components/WelcomeScreen';
import Page from '../components/Page';
import BlogCardList from '../components/BlogCards/BlogCardList';
import Container from '../components/ui/Container';
import Search from '../components/ui/Search';

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
  const [inputSearch, setInputSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <Page title={pageTitle}>
      <div>{!isAuth && <WelcomeScreen data={welcomeScreen} />}</div>
      <Container>
        <div className="text-center pt-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Posts From The Blog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>

        <Search onSearch={handleSearch} searchValue={inputSearch} />

        <BlogCardList searchTerm={inputSearch} />
      </Container>
    </Page>
  );
}
