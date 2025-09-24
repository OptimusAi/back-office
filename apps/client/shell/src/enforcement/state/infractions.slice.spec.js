import 'regenerator-runtime/runtime';
import { infractionsReducer } from './infractions.slice';

describe('Infractions Reducer', () => {
  it('should handle initial state', () => {
    const expected = {
      busy: false,
      error: null,
      activeZoneId: '',
      activeInfraction: null,
      originalActiveInfraction: null,
      searchDate: null,
      zones: {
        entities: {},
        ids: [],
      },
      zoneUpdateMessage: null,
      zoneFilter: '',
      activeImageViewer: null,
      activeImage: -1,
      isEditing: false,
    };
    expect(infractionsReducer(undefined, { type: '' })).toEqual(expected);
  });
});
