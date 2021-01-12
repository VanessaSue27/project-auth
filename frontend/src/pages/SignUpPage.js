import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user } from '../reducers/user';

// If the user already has an account, they can click on the
// Log In button, which will change the page state to 'login'
// and this will redirect them to the Log In Page instead

// This page shows a form in which the user can fill up their username
// and password, those values will be saved in local storage variables
// When the "Create account" button is clicked, this will do a fetch to
// the endpoint for creating a new User in the database. Name and password
// are sent in the body. If successful, the response will include the user ID
// and access token, which we now save in the global store by dispayching those
// corresponding actions. Otherwise an error message is returned

const SIGNUP_URL = 'https://project-auth-vane-axel.herokuapp.com//users';

export const SignUpPage = ({ setPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((store) => store.user.errorMessage); 

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not create account. Please try a different username.');
        }
        return res.json();
      })
      .then((json) => {
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
      })
      .catch((error) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
      });
  };

  return (
    <>
      <h1>Sign Up Page yeahhh!</h1>
      <h3>Create an Account</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength= "3"
            maxLength= "20"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength= "5"
            required
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
      {error && <h4>{`${error}`}</h4>}
      <h4>Already a user?</h4>
      <button type="button" onClick={() => setPage('login')}>Log In</button>
    </>
  );
};
