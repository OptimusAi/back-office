import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SpecFriendly from '../spec-friendly';
import Navbar from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BrowserRouter>
          <Navbar
            permissions={['ROLE_ADMIN']}
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
