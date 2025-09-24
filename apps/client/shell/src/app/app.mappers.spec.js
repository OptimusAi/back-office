import 'regenerator-runtime/runtime';
import {
  zonesMock,
  regions
} from '../utils/test-utils/mocks';

import {
  formatZones,
  formatRegions
} from './app.mappers';

describe('App Mappers', () => {
  describe('should format Zones', () => {
    test('should format zones by providing an id', () => {
      const formattedZonesTest = formatZones(zonesMock);
      expect(formattedZonesTest[0].id).toEqual(1);
    });
  });

  describe('should format Regions', () => {
    test('should return sorted list of Canadian Provinces and USA States with and id', () => {
      const formattedRegions = formatRegions(regions);
      expect(formattedRegions[0]).toStrictEqual({
        id: 'AB',
        code: 'AB',
        country: 'Canada',
        countryCode: 'CA',
        name: 'Alberta',
        regionType: 'PROVINCE',
      },);
    });
  });


});
