import React from 'react';
import { Route } from 'react-router-dom';
import faker from 'faker';

export const useAuth = () => ({
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    authorities: ['ROLE_ADMIN', 'ROLE_ENFORCEMENT', 'ROLE_VERIFICATION'],
  },
  events: { addAccessTokenExpired: () => ({}) },
  logout: () => {
    /* do nothing */
  },
});

export const getToken = async () => Promise.resolve('a-fake-token');

export const Protect = ({
  children,
  onProtected = () => {
    /*Do Nothing*/
  },
}) => {
  onProtected();
  return children;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const ProtectedRoute = ({ component, ...rest }) => (
  <Route {...rest} component={component} />
);

console.info('using fake authority');

export const toUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
});

const AuthContext = React.createContext({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
});

export const AuthConsumer = AuthContext.Consumer;
