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

export const LogInPage = ({ setPage }) => {
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
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
        <p className="p-label">Username:</p>
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
        <p className="p-label">Password:</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength= "5"
            required
          />
        </label>
        <button className="button-primary" type="submit">Log in</button>
      </form>
      {error && <div className="div-error">{`${error}`}</div>}
      <hr/>
      <p className="p-label">Don't have a user?</p>
      <button className="button-secondary" type="button" onClick={() => setPage('signup')}>Sign up</button>
    </>
  );
};
