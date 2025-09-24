import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { zoneCategoriesMock } from '../../../utils/test-utils/mocks';
import ZoneCategoriesEditor from './zone-categories.editor';

describe('Zone Categories Editor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneCategoriesEditor
          activeZoneCategory={zoneCategoriesMock[0]}
          open={false}
          handleClose={() => console.log('handle close')}
          onZoneCategoryUpdate={() => console.log('zone update')}
          activeZoneCategoryEditor={true}
          bylawsList={[]}
          onAssociatedBylawsRequest={() => console.log('on associated bylaws request')}
          onRemoveBylawAssociations={() => console.log('on remove bylaw associations')}
          activeZoneCategoryBylaws={[{id: 1, bylaw: {id: 1}, defaultBylaw: true}]}
          defaultBylaw={{id: 1, bylaw: {id: 1}, defaultBylaw: true}}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
