import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from '@testing-library/react';
import Profile from './profile';
import SpecFriendly from '../spec-friendly';
import { BrowserRouter } from 'react-router-dom';
import { loggedInUser } from '../../utils/test-utils/mocks';

describe('Profile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BrowserRouter>
          <Profile
            user={loggedInUser}
            activeInfraction={null}
            activeLicencePlateId={null}
            onClickAway={() => console.log('click away')}
          />
        </BrowserRouter>
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
