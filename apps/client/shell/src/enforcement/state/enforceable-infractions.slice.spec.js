import 'regenerator-runtime/runtime';
import {
  fetchLicencePlateFromQueue,
  enforceableInfractionsReducer,
  getInfractionBylaws,
} from './enforceable-infractions.slice';

describe('Enforceable Infractions Reducer', () => {
  it('should handle initial state', () => {
    const expected = {
      busy: false,
      error: null,
      entities: {},
      ids: [],
      activeInfractionId: null,
      activeLicencePlateId: null,
      licencePlates: {
        ids: [],
        entities: {},
      },
      searchDate: null,
      regions: [],
      availableBylaws: null,
      activeImage: -1,
      activeImageViewer: null,
      isEditing: false,
    };
    expect(enforceableInfractionsReducer(undefined, { type: '' })).toEqual(
      expected
    );
  });
  describe('fetching licence plates', () => {
    it('should handle fetching licence plates pending', () => {
      let state = enforceableInfractionsReducer(
        undefined,
        fetchLicencePlateFromQueue.pending(null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          busy: true,
          error: null,
          entities: {},
        })
      );
    });
    it('should handle fetching licence plates rejected', () => {
      let state = enforceableInfractionsReducer(
        undefined,
        fetchLicencePlateFromQueue.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeInfractionId: null,
          busy: false,
          entities: {},
          error: 'Uh oh',
          ids: [],
          licencePlates: {
            ids: [],
            entities: {},
          },
        })
      );
    });
  });
  describe('getting infraction bylaws', () => {
    it('should handle getInfractionBylaws pending', () => {
      let state = enforceableInfractionsReducer(
        undefined,
        getInfractionBylaws.pending(null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          busy: true,
          error: null,
          entities: {},
          regions: [],
          availableBylaws: null,
        })
      );
    });

    it('should handle getInfractionBylaws fullfilled', () => {
      let state = enforceableInfractionsReducer(
        undefined,
        getInfractionBylaws.fulfilled([
          { zoneNumber: '2002', bylaw: { id: 1, code: 1, description: 1 } },
        ])
      );
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          error: null,
          entities: {},
          regions: [],
          availableBylaws: [
            { zoneNumber: '2002', bylaw: { id: 1, code: 1, description: 1 } },
          ],
        })
      );
    });

    it('should handle getInfractionBylaws rejected', () => {
      let state = enforceableInfractionsReducer(
        undefined,
        getInfractionBylaws.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          activeInfractionId: null,
          busy: false,
          entities: {},
          error: 'Uh oh',
          ids: [],
          regions: [],
          availableBylaws: null,
        })
      );
    });
  });
});
