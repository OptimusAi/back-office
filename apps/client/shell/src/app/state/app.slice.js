import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  ping,
  getClientData,
  getCountrySubdivisions,
  getAllZones,
} from '@park-plus/api';
import { formatRegions, formatZones } from '../app.mappers';

export const APP_FEATURE_KEY = 'app';

export const zonesAdapter = createEntityAdapter();

export const regionsAdapter = createEntityAdapter();

export const initialAppState = {
  client: '',
  connected: false,
  busy: false,
  error: null,
  regions: regionsAdapter.getInitialState(),
  zones: zonesAdapter.getInitialState(),
};

const isPendingAction = (action) => {
  if (!action.type.includes('pending')) {
    return;
  }
  const ignoredAction =
    action.type.includes('fetchZonesBySearchDate') ||
    action.type.includes('refreshZonesBySearchDate') ||
    action.type.includes('refreshLicencePlates') ||
    action.type.includes('getInfractionBylaws') ||
    action.type.includes('updateZone') ||
    action.type.includes('getZoneCategories') ||
    action.type.includes('getBylaws') ||
    action.type.includes('addZoneCategory') ||
    action.type.includes('addBylaw') ||
    action.type.includes('getRegions') ||
    action.type.includes('getZones') ||
    action.type.includes('getParkPlusClient') ||
    action.type.includes('getAssociatedBylaws') ||
    action.type.includes('addZone');

  return ignoredAction ? false : true;
};
const isFulfilledAction = (action) => action.type.endsWith('fulfilled');
const isZoneUpdateAction = (action) =>
  action.type.includes('setZoneUpdateMessage');

const isRejectedWithErrors = (action) => {
  if (!action.type.includes('rejected')) {
    return;
  }
  return (
    action.type.includes('releaseInfractionFromQueue') ||
    action.type.includes('releasePlateFromQueue') ||
    action.type.includes('fetchInfractionFromQueue') ||
    action.type.includes('fetchLicencePlateFromQueue') ||
    action.type.includes('updateInfraction') ||
    action.type.includes('updateZone') ||
    action.type.includes('addZoneCategory') ||
    action.type.includes('updateZoneCategory') ||
    action.type.includes('deleteZoneCategory') ||
    action.type.includes('deleteBylaw') ||
    action.type.includes('deleteZone') ||
    action.type.includes('addBylaw') ||
    action.type.includes('addZone') ||
    action.type.includes('processInfractions') ||
    action.type.includes('markZoneAsEnforceable')
  );
};

export const connect = createAsyncThunk('app/ping', async () => ping());

export const getParkPlusClient = createAsyncThunk(
  'app/getParkPlusClient',
  async (clientId, { rejectWithValue }) => {
    const response = await getClientData(clientId);
    return response.ok ? response.data : rejectWithValue(response.errors);
  }
);

export const getRegions = createAsyncThunk(
  'app/getRegions',
  async (data, { rejectWithValue }) => {
    const response = await getCountrySubdivisions();
    return response.ok
      ? formatRegions(response.data)
      : rejectWithValue(response.errors);
  }
);

export const getZones = createAsyncThunk(
  'app/getZones',
  async (data, { rejectWithValue }) => {
    const response = await getAllZones();
    return response.ok
      ? formatZones(response.data)
      : rejectWithValue(response.errors);
  }
);

export const appSlice = createSlice({
  name: APP_FEATURE_KEY,
  initialState: initialAppState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connect.pending, (state) => {
        state.busy = true;
      })
      .addCase(connect.fulfilled, (state) => {
        state.busy = false;
        state.connected = true;
      })
      .addCase(connect.rejected, (state, action) => {
        state.busy = false;
        state.connected = false;
        state.error = action.error.message;
      })

      .addCase(getParkPlusClient.pending, (state) => {
        state.busy = false;
      })
      .addCase(getParkPlusClient.fulfilled, (state, action) => {
        state.busy = false;
        state.connected = true;
        state.client = action.payload;
      })
      .addCase(getParkPlusClient.rejected, (state, action) => {
        state.busy = false;
        state.connected = false;
        state.error = action.error.message;
      })

      .addCase(getRegions.pending, (state) => {
        state.busy = false;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        regionsAdapter.setAll(state.regions, action.payload);
        state.busy = false;
      })
      .addCase(getRegions.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(getZones.pending, (state) => {
        state.busy = false;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        zonesAdapter.setAll(state.zones, action.payload);
        state.busy = false;
      })
      .addCase(getZones.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addMatcher(isPendingAction, (state) => {
        state.busy = true;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.busy = false;
      })
      .addMatcher(isRejectedWithErrors, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })
      .addMatcher(isZoneUpdateAction, (state, action) => {
        state.busy = false;
        state.error = { message: action.payload, type: 'success', open: true };
      });
  },
});

export const appReducer = appSlice.reducer;

export const { clearErrorMessage } = appSlice.actions;

export const zonesSelectors = zonesAdapter.getSelectors();

export const regionsSelectors = regionsAdapter.getSelectors();

export const getAppState = (rootState) => rootState[APP_FEATURE_KEY];
