import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { bylawsMock } from '../../../utils/test-utils/mocks';
import Bylaws from './bylaws';

describe('Bylaws', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Bylaws
          bylaws={bylawsMock}
          onBylawsRequest={() => console.log('on bylaws request')}
          onSelectedBylaw={() => console.log('on selected bylaw')}
          activeBylaw={bylawsMock[0]}
          onBylawUpdate={() => console.log('on bylaw update')}
          onNewBylawUpdate={() => console.log('on new bylaw update')}
          onBylawAdd={() => console.log('on bylaw add')}
          activeBylawAdder={false}
          activeBylawEditor={false}
          onAdd={() => 'add'}
          onEdit={() => 'edit'}
          newBylaw={null}
          permissions={[]}
          fetchedBylaws={false}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});