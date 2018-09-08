import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';
import NotFoundPage from './pages/NotFoundPage';

// Route style must be like this due to server side rendering
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
export default [
  {
    ...App,
    routes: [
    {
      ...HomePage,
      path: '/',
      exact: true
    },
    {
      ...AdminsListPage,
      path: '/admins',
    },
    {
      ...UsersListPage,
      path: '/users',
    },
    {
      ...NotFoundPage
    }
  ]
  }
];

