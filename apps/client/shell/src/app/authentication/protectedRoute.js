import { Center } from '@park-plus/ui';
import React from 'react';
import { Route } from 'react-router-dom';
import { AuthConsumer } from './authority';

const ProtectedRoute = ({ component, ...rest }) => {
  const renderFn = (Component) => (props) => (
    <AuthConsumer>
      {({ isAuthenticated, signinRedirect }) => {
        if (!!Component && isAuthenticated()) {
          return <Component {...props} />;
        } else {
          signinRedirect();
          return (
            <Center>
              <span>Loading...</span>
            </Center>
          );
        }
      }}
    </AuthConsumer>
  );
  return <Route {...rest} render={renderFn(component)} />;
};

export default ProtectedRoute;
