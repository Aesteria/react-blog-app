import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from './context/auth-context';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeGuest from './pages/HomeGuest/HomeGuest';

import About from './pages/About/About';
import Terms from './pages/Terms/Terms';

import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import axios from 'axios';
import ViewSinglePost from './pages/ViewSinglePost/ViewSinglePost';
import FlashMessages from './components/FlashMessages/FlashMessages';

import './main.css';

axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <FlashMessages />
      <Header />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/post/:id" element={<ViewSinglePost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
