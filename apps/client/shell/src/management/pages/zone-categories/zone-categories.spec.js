import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { formattedZonesMock, zoneCategoriesMock } from '../../../utils/test-utils/mocks';
import ZoneCategories from './zone-categories';

describe('Zone Categories', () => {

  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneCategories
          zoneCategories={zoneCategoriesMock}
          onZoneCategoriesRequest={() => console.log('on zones categories request')}
          onAssociatedBylawsRequest={() => console.log('on associated bylaws request')}
          bylawsList={[]}
          onSelectedZoneCategory={() => console.log('on selected zone category')}
          activeZoneCategory={formattedZonesMock[0]}
          onZoneCategoryUpdate={() => console.log('on zones update')}
          onZoneCategoryAdd={() => console.log('on zones update')}
          onRemoveBylawAssociations={() => console.log('on remove bylaw associations')}
          onBylawsRequest={() => 'request bylaws'}
          activeZoneCategoryId={''}
          activeZoneCategoryEditor={false}
          activeZoneCategoryAdder={false}
          activeZoneCategoryBylaws={[{id: 1, bylaw: {id: 1}, defaultBylaw: true}]}
          defaultBylaw={{id: 1, bylaw: {id: 1}, defaultBylaw: true}}
          onAdd={() => 'add'}
          onEdit={() => 'edit'}
          permissions={[]}
          fetchedZoneCategories={false}
          fetchedBylaws={false}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
