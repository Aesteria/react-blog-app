import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeGuest from './components/HomeGuest/HomeGuest';

import About from './pages/About/About';
import Terms from './pages/Terms/Terms';

import './main.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
