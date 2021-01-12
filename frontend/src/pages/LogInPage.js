import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user, login } from '../reducers/user';

// This page shows a form in which the user can fill up their username
// and password, those values will be saved in local storage variables
// When the "LOG IN" button is clicked, this will dispatch the login thunk
// which carries the username and password values
// login will do a fetch to the sessions endpoint, which will validate the user
// if successful, it will save the user's ID and access token in the global
// store, giving the user access to the secret page

export const LogInPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((store) => store.user.errorMessage);

  // Added this function, so that if there was any error messages set up in the
  // sign up page, they are cleared and don't show in the login page
  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
  }, [dispatch]); 

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
  };

  return (
    <>
      <h1>Log In Page yeahhh!</h1>
      <h3>Enter your details:</h3>
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
        <button type="submit">LOG IN</button>
      </form>
      {error && <h4>{`${error}`}</h4>}
    </>
  );
};
