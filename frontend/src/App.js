import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { user } from './reducers/user';

import { LandingPage } from './pages/LandingPage';

const reducer = combineReducers({ user: user.reducer });

// setup store
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <main>
      <LandingPage />
      </main>
    </Provider>
  );
};
