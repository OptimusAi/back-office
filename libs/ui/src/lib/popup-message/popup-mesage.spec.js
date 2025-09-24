import React from 'react';
import { render } from '@testing-library/react';
import PopupMessage from './popup-message';
import { IntlProvider } from 'react-intl';
describe('Pop up message', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <IntlProvider>
        <PopupMessage message="this is an error message" />
      </IntlProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
