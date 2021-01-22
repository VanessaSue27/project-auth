import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: 0,
  accessToken: localStorage.validToken || null,
  secretMessage: null,
  errorMessage: null
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.userId = userId;
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      localStorage.setItem('validToken', accessToken);
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.errorMessage = errorMessage;
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      state.secretMessage = secretMessage;
    }
  }
});

// THUNKS
export const getSecretMessage = (userId, accessToken) => {
  return (dispatch) => {
    fetch(`https://project-auth-vane-axel.herokuapp.com/users/${userId}/secret`, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not get information, please make sure you are logged in.');
        }
        return res.json();
      })
      .then((json) => {
        dispatch(user.actions.setSecretMessage({ secretMessage: json.secretMessage }));
      })
      .catch((error) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
      });
  };
};

export const login = (name, password) => {
  return (dispatch) => {
    fetch('https://project-auth-vane-axel.herokuapp.com/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to log in, please check your username and password.');
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
      })
      .catch((error) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(user.actions.setSecretMessage({ secretMessage: null }));
    localStorage.removeItem('validToken');
  };
};

// Article to remove warning: "Expected an error object to be thrown no-throw-literal"
// https://eslint.org/docs/rules/no-throw-literal
// How to access the Error message so it can be set as Error Message: toString()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString
