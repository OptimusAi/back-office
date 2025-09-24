import { Center } from '@park-plus/ui';
import React from 'react';
import { AuthConsumer } from './authority';

const LogoutCallback = () => (
  <AuthConsumer>
    {({ signoutRedirectCallback }) => {
      signoutRedirectCallback();
      return (
        <Center>
          <span>Loading...</span>
        </Center>
      );
    }}
  </AuthConsumer>
);

export default LogoutCallback;
