import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  zoneUpdate,
  getAllZoneCategories,
  getAllZoneCities,
  zoneDelete,
  zoneAdd,
} from '@park-plus/api';
import { mapErrors } from '../management.mappers';
import { getZones } from '../../app/state/app.slice';

export const ZONES_FEATURE_KEY = 'zones';

export const zonesAdapter = createEntityAdapter();

export const getZoneCategories = createAsyncThunk(
  'zones/getZoneCategories',
  async (data, { rejectWithValue }) => {
    const response = await getAllZoneCategories();
    return response.ok ? response.data : rejectWithValue(response.errors);
  }
);

export const getZoneCities = createAsyncThunk(
  'zones/getZoneCities',
  async (data, { rejectWithValue }) => {
    const response = await getAllZoneCities();
    return response.ok ? response.data : rejectWithValue(response.errors);
  }
);

export const updateZone = createAsyncThunk(
  'zones/updateZone',
  async (zone, { dispatch, rejectWithValue }) => {
    const body = {
      ...zone,
      zoneCategoryId: zone.zoneCategory.id,
      cityId: zone.city.id,
    };
    const response = await zoneUpdate(zone.zone, { body });
    if (response.ok) {
      dispatch(getZones());
    }
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const deleteZone = createAsyncThunk(
  'zones/deleteZone',
  async (zone, { rejectWithValue }) => {
    const response = await zoneDelete(zone);
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const addZone = createAsyncThunk(
  'zones/addZone',
  async (zone, { rejectWithValue }) => {
    const response = await zoneAdd(zone);
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

const isClearMessageAction = (action) =>
  action.type.includes('clearErrorMessage');

export const initialZonesState = zonesAdapter.getInitialState({
  activeZoneId: '',
  zoneCategoriesList: [],
  zoneCitiesList: [],
  error: null,
  activeZoneEditor: false,
  activeZoneAdder: false,
  fetchedZoneCategories: false,
});

export const zonesSlice = createSlice({
  name: ZONES_FEATURE_KEY,
  initialState: initialZonesState,
  reducers: {
    setActiveZone: (state, action) => {
      state.activeZoneId = action.payload;
      state.error = null;
    },
    setActiveZoneEditor: (state, action) => {
      state.activeZoneEditor = action.payload;
    },
    setActiveZoneAdder: (state, action) => {
      state.activeZoneAdder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getZoneCategories.pending, (state) => {
        state.busy = true;
      })
      .addCase(getZoneCategories.fulfilled, (state, action) => {
        state.zoneCategoriesList = action.payload;
        state.fetchedZoneCategories = true;
        state.busy = false;
      })
      .addCase(getZoneCategories.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
        state.fetchedZoneCategories = true;
      })

      .addCase(getZoneCities.pending, (state) => {
        state.busy = true;
      })
      .addCase(getZoneCities.fulfilled, (state, action) => {
        state.zoneCitiesList = action.payload;
        state.busy = false;
      })
      .addCase(getZoneCities.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(updateZone.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(updateZone.fulfilled, (state, action) => {
        zonesAdapter.updateOne(state, {
          id: action.payload.zone,
          changes: {
            zone: action.payload.zone,
            address: action.payload.address,
            city: { ...action.payload.city },
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
            pairingTimeLimit: action.payload.pairingTimeLimit,
            arrivalGraceTime: action.payload.arrivalGraceTime,
            departureGraceTime: action.payload.departureGraceTime,
            zoneCategory: { ...action.payload.zoneCategory },
          },
        });
        state.busy = false;
        state.activeZoneEditor = false;
        state.error = null;
      })
      .addCase(updateZone.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })
      .addCase(deleteZone.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(deleteZone.fulfilled, (state) => {
        state.busy = false;
        state.error = null;
      })
      .addCase(deleteZone.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(addZone.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(addZone.fulfilled, (state) => {
        state.busy = false;
        state.error = null;
        state.activeZoneAdder = false;
      })
      .addCase(addZone.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addMatcher(isClearMessageAction, (state) => {
        state.busy = false;
        state.error = null;
      })

      .addDefaultCase((state) => state);
  },
});

export const zonesReducer = zonesSlice.reducer;

export const {
  setActiveZone,
  setActiveZoneEditor,
  setActiveZoneAdder,
} = zonesSlice.actions;

export const zonesActions = zonesSlice.actions;

export const zonesSelectors = zonesAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = zonesSelectors;

export const getZonesState = (rootState) => {
  return rootState[ZONES_FEATURE_KEY];
};

export const selectAllZones = createSelector(getZonesState, selectAll);

export const selectZoneEntities = createSelector(getZonesState, selectEntities);
