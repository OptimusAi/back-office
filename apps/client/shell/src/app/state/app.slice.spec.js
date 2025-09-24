import 'regenerator-runtime/runtime';
import { connect, appReducer, getParkPlusClient, getZones, getRegions } from './app.slice';
import faker from 'faker';

const fakeClient = {
  id: faker.random.uuid,
  name: faker.company.companyName(),
  externalClientId: 'test-client',
  primaryContactEmailAddress: faker.internet.email()
}
describe('app reducer', () => {
  it('should handle initial state', () => {
    const expected = {
      busy: false,
      connected: false,
      error: null,
      client: '',
      regions: {
        ids: [],
        entities: {}
      },
      zones: {
        ids: [],
        entities: {}
      }
    };
    expect(appReducer(undefined, { type: '' })).toEqual(expected);
  });
  it('should handle connect', () => {
    let state = appReducer(undefined, connect.pending(null, null));
    expect(state).toEqual(
      expect.objectContaining({
        busy: true,
        connected: false,
        error: null,
        client: '',
        regions: {
          ids: [],
          entities: {}
        },
        zones: {
          ids: [],
          entities: {}
        }
      })
    );
    state = appReducer(state, connect.fulfilled({}, null, null));
    expect(state).toEqual(
      expect.objectContaining({
        busy: false,
        connected: true,
        error: null,
        client: '',
        regions: {
          ids: [],
          entities: {}
        },
        zones: {
          ids: [],
          entities: {}
        }
      })
    );
    state = appReducer(
      state,
      connect.rejected(new Error('Uh oh'), null, null, null)
    );
    expect(state).toEqual(
      expect.objectContaining({
        busy: false,
        connected: false,
        error: 'Uh oh',
        client: '',
        regions: {
          ids: [],
          entities: {}
        },
        zones: {
          ids: [],
          entities: {}
        }
      })
    );
  });
  describe('getting client data', () => {
    it('should handle get client data - pending', () => {
      let state = appReducer(undefined, getParkPlusClient.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: null,
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get client data - rejected', () => {
      let state = appReducer(undefined, getParkPlusClient.rejected(new Error('Uh oh'), null, null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: 'Uh oh',
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get client data - fullfilled', () => {
      let state = appReducer(undefined, getParkPlusClient.fulfilled(fakeClient, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: true,
          error: null,
          client: fakeClient
        })
      );
    });
  });

  describe('getting zones', () => {
    it('should handle get zones - pending', () => {
      let state = appReducer(undefined, getZones.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: null,
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get zones - rejected', () => {
      let state = appReducer(undefined, getZones.rejected(new Error('Uh oh'), null, null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: 'Uh oh',
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get zones - fullfilled', () => {
      let state = appReducer(
        undefined,
        getZones.fulfilled([{ id: 1 }, { id: 2 }])
      );
      expect(state).toStrictEqual(
        expect.objectContaining({
          busy: false,
          client: '',
          connected: false,
          error: null,
          regions: {ids:[], entities: {}},
          zones: {
            entities: { 1: {id: 1}, 2: {id: 2}},
            ids: [1, 2],
          }
        })
      );
    });
  });

  describe('getting regions', () => {
    it('should handle get regions - pending', () => {
      let state = appReducer(undefined, getZones.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: null,
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get regions - rejected', () => {
      let state = appReducer(undefined, getZones.rejected(new Error('Uh oh'), null, null, null));
      expect(state).toEqual(
        expect.objectContaining({
          busy: false,
          connected: false,
          error: 'Uh oh',
          client: '',
          regions: {
            ids: [],
            entities: {}
          },
          zones: {
            ids: [],
            entities: {}
          }
        })
      );
    });
    it('should handle get regions - fullfilled', () => {
      let state = appReducer(
        undefined,
        getRegions.fulfilled([{ id: 1 }, { id: 2 }])
      );
      expect(state).toStrictEqual(
        expect.objectContaining({
          busy: false,
          client: '',
          connected: false,
          error: null,
          zones: {ids:[], entities: {}},
          regions: {
            entities: { 1: {id: 1}, 2: {id: 2}},
            ids: [1, 2],
          }
        })
      );
    });
  });
});
