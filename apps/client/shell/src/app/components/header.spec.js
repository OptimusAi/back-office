import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../spec-friendly';
import { loggedInUser } from '../../utils/test-utils/mocks';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BrowserRouter>
          <Header
            title={'test'}
            user={loggedInUser}
            activeInfraction={null}
            onClickAway={() => console.log('click away')}
          />
        </BrowserRouter>
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
