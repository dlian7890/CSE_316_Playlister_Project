import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './auth-request-api';

const AuthContext = createContext();
console.log('create AuthContext: ' + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: 'GET_LOGGED_IN',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  REGISTER_USER: 'REGISTER_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    errorMessage: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: '',
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: '',
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          errorMessage: '',
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: '',
        });
      }
      case AuthActionType.AUTH_ERROR: {
        return setAuth({
          errorMessage: payload,
        });
      }
      default:
        return auth;
    }
  };

  auth.getLoggedIn = async () => {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.GET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.registerUser = async (
    firstName,
    lastName,
    username,
    email,
    password,
    passwordVerify
  ) => {
    try {
      const response = await api.registerUser(
        firstName,
        lastName,
        username,
        email,
        password,
        passwordVerify
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        navigate('/home');
        auth.loginUser(email, password);
      }
    } catch (err) {
      console.log(err.response.data.errorMessage);
      auth.setErrorMessage(err.response.data.errorMessage);
    }
  };

  auth.loginUser = async (email, password) => {
    try {
      const response = await api.loginUser(email, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
          },
        });
        navigate('/home');
      }
    } catch (err) {
      auth.setErrorMessage(err.response.data.errorMessage);
    }
  };

  auth.logoutUser = async () => {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      navigate('/');
    }
  };

  auth.getUserInitials = () => {
    let initials = '';
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log('user initials: ' + initials);
    return initials;
  };

  auth.setErrorMessage = (errorMessage) => {
    authReducer({
      type: AuthActionType.AUTH_ERROR,
      payload: errorMessage,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
