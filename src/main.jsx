import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import App from './App';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { About } from './pages/About';
import { Movie } from './pages/Movie';
import { Search } from './pages/Search';

import './index.css';

const RouteContainer = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
        <motion.div
        key={location.pathname}
        initial={{width:0}}
        animate={{width:'100%'}}
        exit={{x:window.innerWidth, transition:{duration:0.2}}}
        style={{ minHeight: 'calc(100vh - 130px)' }} // 80px é a altura do footer
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<RouteContainer><Home /></RouteContainer>} />
          <Route path="/about" element={<RouteContainer><About /></RouteContainer>} />
          <Route path="/movies" element={<RouteContainer><Movies /></RouteContainer>} />
          <Route path="movie/:id" element={<RouteContainer><Movie /></RouteContainer>} />
          <Route path="search" element={<RouteContainer><Search /></RouteContainer>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);