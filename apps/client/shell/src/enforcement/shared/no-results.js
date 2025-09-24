import React from 'react';
import { Center } from '@park-plus/ui';
import { FormattedMessage } from 'react-intl';

const NoResults = ({ messageId }) => {
  return (
    <Center>
        <FormattedMessage id={messageId} />
    </Center>
  );
};

export default NoResults;
