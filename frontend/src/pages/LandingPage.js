import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SignUpPage } from './SignUpPage';
import { LogInPage } from './LogInPage';
import { SecretPage } from './SecretPage';

// Page where the user can Sign up for a new account or
// click link to Log In page if already existing user

// When the user has either logged in or signed up succesfully,
// their access token will be saved in the global store, and this
// will generate the SecretPage

export const LandingPage = () => {
  // state to determine which page to show
  const [page, setPage] = useState('signup');
  const accessToken = useSelector((store) => store.user.accessToken);

  if (!accessToken) {
    return (
      <>
        {page === 'signup' ? (<SignUpPage setPage={setPage} />) : (<LogInPage />)}
      </>
    );
  } else {
    return (
      <SecretPage setPage={setPage} />
    );
  }
};
