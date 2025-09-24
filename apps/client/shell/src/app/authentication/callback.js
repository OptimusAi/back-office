import React from 'react';
import { Center } from '@park-plus/ui';
import { AuthConsumer } from './authority';

const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return (
        <Center>
          <span>Loading...</span>
        </Center>
      );
    }}
  </AuthConsumer>
);

export default Callback;
