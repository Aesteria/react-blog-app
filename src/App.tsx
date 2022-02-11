import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeGuest from './pages/HomeGuest/HomeGuest';

import About from './pages/About/About';
import Terms from './pages/Terms/Terms';

import './main.css';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import axios from 'axios';
import ViewSinglePost from './pages/ViewSinglePost/ViewSinglePost';

axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('complexappToken'))
  );

  const loginHandler = () => {
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Header
        loggedIn={loggedIn}
        onLogin={loginHandler}
        onLogout={logoutHandler}
      />
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
