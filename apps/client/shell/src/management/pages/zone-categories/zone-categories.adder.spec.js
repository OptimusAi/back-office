import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import ZoneCategoriesAdder from './zone-categories.adder';

describe('Zone Categories Adder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneCategoriesAdder
          open={false}
          handleClose={() => console.log('handle close')}
          onZoneCategoryAdd={() => console.log('zone category add')}
          activeZoneCategoryAdder={true}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});