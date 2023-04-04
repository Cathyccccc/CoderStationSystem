import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Issue from '../pages/Issue';
import Book from '../pages/Book';
import Interview from '../pages/Interview';
import IssueDetail from '../pages/IssueDetail';
import PersonalCenter from '../pages/PersonalCenter';
import AddIssue from '../pages/AddIssue';
import BookDetail from '../pages/BookDetail';
import SearchPage from '../pages/SearchPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/issues" element={<Issue />} />
      <Route path='/issues/:id' element={<IssueDetail />} />
      <Route path='/addIssue' element={<AddIssue />} />
      <Route path='/books' element={<Book />} />
      <Route path='/books/:id' element={<BookDetail />} />
      <Route path='/interviews' element={<Interview />} />
      <Route path='/searchPage' element={<SearchPage />} />
      <Route path='/personal' element={<PersonalCenter />} />
      <Route path='/' element={<Navigate to='/issues' replace />} />
    </Routes>
  )
}
