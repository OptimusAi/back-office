import React from 'react';
import { render } from '@testing-library/react';
import BackdropModal from './backdrop-modal';

describe('BackdropModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BackdropModal isActive={true} message={'noUserRole'} />
    );
    expect(baseElement).toBeTruthy();
  });
});
