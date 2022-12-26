import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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

        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
          <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  value={inputSearch}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <BlogCardList searchTerm={inputSearch} />
      </Container>
    </Page>
  );
}
