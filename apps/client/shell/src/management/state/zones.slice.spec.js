import 'regenerator-runtime/runtime';
import { formattedZonesMock, updatedZoneMock } from '../../utils/test-utils/mocks';
import { zonesReducer, updateZone, getZoneCategories, getZoneCities } from './zones.slice';

describe('zones reducer', () => {
  it('should handle initial state', () => {
    const expected = {
      entities: {},
      ids: [],
      activeZoneId: '',
      zoneCategoriesList: [],
      zoneCitiesList: [],
      error: null,
      activeZoneEditor: false,
      activeZoneAdder: false,
      fetchedZoneCategories: false
    };
    expect(zonesReducer(undefined, { type: '' })).toEqual(expected);
  });

  describe('updating zone', () => {
    it('should handle update zone pending', () => {
        let state = zonesReducer(
          {
            activeZoneId: '',
            busy: true,
            entities: {1: {...formattedZonesMock[0]}},
            ids: [1],
            zoneCitiesList: [],
            zoneCategoriesList: [],
          },
          updateZone.pending(null, null)
        );
        expect(state).toEqual(
          expect.objectContaining({
            activeZoneId: '',
            busy: true,
            entities: {1: {...formattedZonesMock[0]}},
            ids: [1],
            zoneCitiesList: [],
            zoneCategoriesList: [],
          })
        );
    });
    it('should handle update zone fullfilled', () => {
      let state = zonesReducer(
        {
          activeZoneId: '',
          busy: false,
          entities: {1: {...formattedZonesMock[0]}},
          ids: [1],
          zoneCitiesList: [],
          zoneCategoriesList: [],
        },
        updateZone.fulfilled(updatedZoneMock, null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeZoneId: '',
          busy: false,
          entities: {1: {...updatedZoneMock}},
          ids: [1],
          zoneCitiesList: [],
          zoneCategoriesList: [],
        })
      )
    });

/*     it('should handle update zone rejected', () => {
      let state = zonesReducer(
        {
          activeZoneId: '',
          busy: false,
          entities: {1: {...formattedZonesMock[0]}},
          ids: [1],
          zoneCategoriesList: [],
        },
        updateZone.rejected(
          { message: 'Rejected'},
          null,
          [{ code: 'VALIDATION', correlationId: 1, message: 'Invalid Request' }],

        )
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeZoneId: '',
          busy: false,
          entities: {1: {...formattedZonesMock[0]}},
          zoneCategoriesList: [],
          error: 'Something went wrong',
          ids: [1],
        })
      );
    }); */
  });

  describe('getting zone categories', () => {
    it('should handle getting zones pending', () => {
      let state = zonesReducer(
        undefined,
        getZoneCategories.pending(null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeZoneId: '',
          busy: true,
          entities: {},
          ids: [],
          zoneCitiesList: [],
          zoneCategoriesList: []
        })
      );
    });

    it('should handle getting zones fullfilled', () => {
      let state = zonesReducer(
        undefined,
        getZoneCategories.fulfilled([{ id: 1}, { id: 2 }], null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeZoneId: '',
          busy: false,
          entities: {},
          ids: [],
          zoneCitiesList: [],
          zoneCategoriesList: [{ id: 1}, { id: 2 }]
        })
      );
    });

    it('should handle getting zones rejected', () => {
      let state = zonesReducer(
        undefined,
        getZoneCategories.rejected(new Error('Uh oh'), null, null),
        getZoneCities.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeZoneId: '',
          busy: false,
          entities: {},
          error: 'Uh oh',
          ids: [],
          zoneCategoriesList: []
        })
      );
    });
  });
});