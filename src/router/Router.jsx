import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Issue from '../pages/Issue';
import Book from '../pages/Book';
import Interview from '../pages/Interview';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Issue />} />
      <Route path='/books' element={<Book />} />
      <Route path='/interviews' element={<Interview />} />
    </Routes>
  )
}
