import React from 'react';
import { Center } from '@park-plus/ui';
import { AuthConsumer } from './authority';

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => {
      logout();
      return (
        <Center>
          <span>Loading...</span>
        </Center>
      );
    }}
  </AuthConsumer>
);

export default Logout;
