import { lazy, useContext, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import HomeGuest from './pages/HomeGuest/HomeGuest';
import About from './pages/About/About';
import Terms from './pages/Terms/Terms';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

import FlashMessages from './components/FlashMessages/FlashMessages';

import { AppDispatchContext, AppStateContext } from './context/appContext';

import './main.css';
import EditPost from './pages/EditPost/EditPost';
import NotFound from './pages/NotFound/NotFound';
import { ApiService } from './api/ApiService';
import Search from './components/Search/Search';
import LoadingDotsIcon from './components/LoadingDotsIcon/LoadingDotsIcon';

const CreatePost = lazy(() => import('./pages/CreatePost/CreatePost'));
const ViewSinglePost = lazy(
  () => import('./pages/ViewSinglePost/ViewSinglePost')
);
const Chat = lazy(() => import('./components/Chat/Chat'));

axios.defaults.baseURL = ApiService.baseURL;

const App = () => {
  const { loggedIn, user, isSearchActive } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('complexappToken', user.token);
      localStorage.setItem('complexappUsername', user.username);
      localStorage.setItem('complexappAvatar', user.avatar);
    } else {
      localStorage.removeItem('complexappToken');
      localStorage.removeItem('complexappUsername');
      localStorage.removeItem('complexappAvatar');
    }
  }, [loggedIn, user.token, user.username, user.avatar]);

  // check if token has expired
  useEffect(() => {
    if (loggedIn) {
      const source = axios.CancelToken.source();

      const fetchResults = async () => {
        try {
          const response = await ApiService.checkToken(user.token, {
            cancelToken: source.token,
          });

          if (!response.data) {
            appDispatch({ type: 'LOGOUT' });
            appDispatch({
              type: 'ADD_FLASH_MESSAGE',
              payload: 'Your session has expired',
            });
          }
        } catch (e) {
          console.log(
            'There was an error while check token or request was cancelled.'
          );
        }
      };
      fetchResults();
    }
  }, [loggedIn, user.token, appDispatch]);

  return (
    <BrowserRouter>
      <FlashMessages />
      <Header />
      <Suspense fallback={<LoadingDotsIcon />}>
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile/:username/*" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CSSTransition
        timeout={330}
        in={isSearchActive}
        classNames="search-overlay"
        unmountOnExit
      >
        <Search />
      </CSSTransition>
      <Suspense fallback="">{loggedIn && <Chat />}</Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
