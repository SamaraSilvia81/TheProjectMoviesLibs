import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'

import {Home}from './pages/Home'
import {Movies} from './pages/Movies'
import {About}from './pages/About'
import {Movie} from './pages/Movie'
import {Search} from './pages/Search'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="movie/:id" element={<Movie/>}/>
          <Route path="search" element={<Search/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
