import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import HomeGuest from './pages/HomeGuest/HomeGuest';
import About from './pages/About/About';
import Terms from './pages/Terms/Terms';
import ViewSinglePost from './pages/ViewSinglePost/ViewSinglePost';
import CreatePost from './pages/CreatePost/CreatePost';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

import FlashMessages from './components/FlashMessages/FlashMessages';

import { AppStateContext } from './context/appContext';

import './main.css';
import EditPost from './pages/EditPost/EditPost';
import NotFound from './pages/NotFound/NotFound';

axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
  const { loggedIn, user } = useContext(AppStateContext);

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

  return (
    <BrowserRouter>
      <FlashMessages />
      <Header />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/post/:id" element={<ViewSinglePost />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
