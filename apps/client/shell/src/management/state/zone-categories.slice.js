import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  zoneCategoryUpdate,
  zoneCategoryAdd,
  zoneCategoryDelete,
  bylawAssociation,
  getBylawsByZoneCategory,
  removeBylawAssociation,
} from '@park-plus/api';
import { mapErrors } from '../management.mappers';

export const ZONE_CATEGORIES_FEATURE_KEY = 'zoneCategories';

export const zoneCategoriesAdapter = createEntityAdapter();

export const updateZoneCategory = createAsyncThunk(
  'zoneCategories/updateZoneCategory',
  async (zoneCategory, { getState, rejectWithValue }) => {
    const currentState = getState().management.zoneCategories;
    let bylawAssociationResponse;
    let removeBylawAssociationResponse;
    const currentZoneCategory =
      currentState.entities[currentState.activeZoneCategoryId];
    let body = {
      id: currentZoneCategory.id,
      name: zoneCategory.name,
      description: zoneCategory.description,
      arrivalGraceTime: zoneCategory.arrivalGraceTime,
      departureGraceTime: zoneCategory.departureGraceTime,
      
    };
    const zoneCategoryResponse = await zoneCategoryUpdate(
      currentZoneCategory.id,
      { body }
    );
    if (zoneCategoryResponse.ok) {
      if (
        zoneCategory.newBylaws.length !== 0 ||
        zoneCategory.defaultBylawId !== null ||
        zoneCategory.defaultBylawId === null
      ) {
        body = {
          zoneCategoryId: currentState.activeZoneCategoryId,
          bylawsIds: zoneCategory.newBylaws,
          defaultBylawId: zoneCategory.defaultBylawId,
        };
        bylawAssociationResponse = await bylawAssociation({ body });
        if (bylawAssociationResponse.ok) {
          if (zoneCategory.removedBylaws.length !== 0) {
            removeBylawAssociationResponse = await removeBylawAssociation({
              zoneCategoryId: currentState.activeZoneCategoryId,
              bylawsIds: zoneCategory.removedBylaws,
            });
            return removeBylawAssociationResponse.ok
              ? removeBylawAssociationResponse.data
              : rejectWithValue(
                  mapErrors(removeBylawAssociationResponse.errors)
                );
          } else return bylawAssociationResponse.data;
        } else {
          return rejectWithValue(mapErrors(bylawAssociationResponse.errors));
        }
      } else if (zoneCategory.removedBylaws.length !== 0) {
        removeBylawAssociationResponse = await removeBylawAssociation({
          zoneCategoryId: currentState.activeZoneCategoryId,
          bylawsIds: zoneCategory.removedBylaws,
        });
        return removeBylawAssociationResponse.ok
          ? removeBylawAssociationResponse.data
          : rejectWithValue(mapErrors(removeBylawAssociationResponse.errors));
      } else return zoneCategoryResponse.data;
    } else {
      return rejectWithValue(mapErrors(zoneCategoryResponse.errors));
    }
  }
);

export const addZoneCategory = createAsyncThunk(
  'zoneCategories/addZoneCategory',
  async (zoneCategory, { rejectWithValue }) => {
    let bylawAssociationResponse;
    let body = { ...zoneCategory };
    const zoneCategoryResponse = await zoneCategoryAdd({ body });
    if (zoneCategoryResponse.ok) {
      body = {
        bylawsIds: [...zoneCategory.bylaws],
        zoneCategoryId: zoneCategoryResponse.data.id,
      };
      bylawAssociationResponse = await bylawAssociation({ body });
      return bylawAssociationResponse.ok
        ? bylawAssociationResponse.data
        : rejectWithValue(mapErrors(bylawAssociationResponse.errors));
    } else {
      return rejectWithValue(mapErrors(zoneCategoryResponse.errors));
    }
  }
);

export const deleteZoneCategory = createAsyncThunk(
  'zoneCategories/deleteZoneCategory',
  async (zoneCategory, { rejectWithValue }) => {
    const response = await zoneCategoryDelete(zoneCategory);
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const getAssociatedBylaws = createAsyncThunk(
  'zoneCategories/getAssociatedBylaws',
  async (data, { getState, rejectWithValue }) => {
    const currentState = getState().management.zoneCategories;
    const response = await getBylawsByZoneCategory(
      currentState.activeZoneCategoryId
    );
    if (response.ok) {
      const bylaws = response.data;
      const defaultBylaw = bylaws.find((b) => b.defaultBylaw === true) || null;
      return {
        bylaws,
        defaultBylaw: defaultBylaw === null ? null : defaultBylaw.bylaw,
      };
    } else {
      return rejectWithValue(response.errors);
    }
  }
);

export const associateBylaws = createAsyncThunk(
  'zoneCategories/associateBylaws',
  async ({ bylawsAssociations }, { getState, rejectWithValue }) => {
    const currentState = getState().management.zoneCategories;
    let bylawAssociationResponse;
    let removeBylawAssociationResponse;
    let body = {
      zoneCategoryId: currentState.activeZoneCategoryId,
      bylawsIds: bylawsAssociations.newBylaws,
      defaultBylawId: bylawsAssociations.defaultBylawId,
    };
    bylawAssociationResponse = await bylawAssociation({ body });
    if (bylawAssociationResponse.ok) {
      if (bylawsAssociations.removedBylaws.length !== 0) {
        removeBylawAssociationResponse = await removeBylawAssociation({
          zoneCategoryId: currentState.activeZoneCategoryId,
          bylawsIds: bylawsAssociations.removedBylaws,
        });
        return removeBylawAssociationResponse.ok
          ? removeBylawAssociationResponse.data
          : rejectWithValue(mapErrors(removeBylawAssociationResponse.errors));
      } else return bylawAssociationResponse.data;
    } else {
      return rejectWithValue(mapErrors(bylawAssociationResponse.errors));
    }
  }
);

export const removeAssociatedBylaws = createAsyncThunk(
  'zoneCategories/removeAssociatedBylaws',
  async ({ bylawsIds }, { getState, rejectWithValue }) => {
    const currentState = getState().management.zoneCategories;
    const response = await removeBylawAssociation({
      zoneCategoryId: currentState.activeZoneCategoryId,
      bylawsIds,
    });
    return response ? response : rejectWithValue(mapErrors(response.errors));
  }
);

export const initialZoneCategoriesState = zoneCategoriesAdapter.getInitialState(
  {
    activeZoneCategoryId: '',
    error: null,
    bylawsList: [],
    activeZoneCategoryBylaws: null,
    defaultBylaw: null,
  }
);

const isClearMessageAction = (action) =>
  action.type.includes('clearErrorMessage');

const isEditingZoneCategoryAction = (action) => {
  action.type.includes('fullfilled') &&
    action.type.includes('removeAssociatedBylaws') &&
    action.type.includes('associateBylaws') &&
    action.type.includes('updateZoneCategory');
};

const fetchedZoneCategories = (action) =>
  action.type === 'zones/getZoneCategories/fulfilled';

const fetchedBylaws = (action) => action.type === 'bylaws/getBylaws/fulfilled';

export const zoneCategoriesSlice = createSlice({
  name: ZONE_CATEGORIES_FEATURE_KEY,
  initialState: initialZoneCategoriesState,
  reducers: {
    setActiveZoneCategory: (state, action) => {
      state.activeZoneCategoryId = action.payload;
      state.activeZoneCategoryBylaws = null;
      state.error = null;
    },
    setActiveZoneCategoryEditor: (state, action) => {
      state.activeZoneCategoryEditor = action.payload;
      state.defaultBylaw = null;
    },
    setActiveZoneCategoryAdder: (state, action) => {
      state.activeZoneCategoryAdder = action.payload;
    },
    setDefaultBylaw: (state, action) => {
      state.defaultBylaw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateZoneCategory.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(updateZoneCategory.fulfilled, (state, action) => {
        zoneCategoriesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            name: action.payload.name,
            description: action.payload.description,
          },
        });
        state.busy = false;
        state.error = null;
        state.activeZoneCategoryEditor = false;
      })
      .addCase(updateZoneCategory.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(addZoneCategory.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(addZoneCategory.fulfilled, (state, action) => {
        state.busy = false;
        state.activeZoneCategoryId = action.payload.id;
        state.error = null;
      })
      .addCase(addZoneCategory.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(deleteZoneCategory.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(deleteZoneCategory.fulfilled, (state) => {
        state.busy = false;
        state.error = null;
      })
      .addCase(deleteZoneCategory.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(getAssociatedBylaws.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(getAssociatedBylaws.fulfilled, (state, action) => {
        state.busy = false;
        state.error = null;
        state.activeZoneCategoryBylaws = action.payload.bylaws;
        state.defaultBylaw = action.payload.defaultBylaw;
      })
      .addCase(getAssociatedBylaws.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(associateBylaws.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(associateBylaws.fulfilled, (state, action) => {
        state.busy = false;
        state.error = null;
        state.activeZoneCategoryAdder = false;
        state.activeZoneCategoryBylaws = null;
        state.defaultBylaw = null;
        state.activeZoneCategoryEditor = false;
      })
      .addCase(associateBylaws.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(removeAssociatedBylaws.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(removeAssociatedBylaws.fulfilled, (state, action) => {
        state.busy = false;
        state.error = null;
        state.activeZoneCategoryBylaws = null;
        state.defaultBylaw = null;
        state.activeZoneCategoryEditor = false;
      })
      .addCase(removeAssociatedBylaws.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addMatcher(isClearMessageAction, (state) => {
        state.busy = false;
        state.error = null;
      })

      .addMatcher(isEditingZoneCategoryAction, (state) => {
        state.activeZoneCategoryEditor = false;
      })

      .addMatcher(fetchedZoneCategories, (state, action) => {
        zoneCategoriesAdapter.setAll(state, action.payload);
      })

      .addMatcher(fetchedBylaws, (state, action) => {
        state.bylawsList = action.payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const zoneCategoriesReducer = zoneCategoriesSlice.reducer;

export const {
  setActiveZoneCategory,
  setActiveZoneCategoryEditor,
  setActiveZoneCategoryAdder,
  setDefaultBylaw,
} = zoneCategoriesSlice.actions;

export const zoneCategoriesActions = zoneCategoriesSlice.actions;

export const zoneCategoriesSelectors = zoneCategoriesAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = zoneCategoriesSelectors;

export const getZoneCategoriesState = (rootState) => {
  return rootState[ZONE_CATEGORIES_FEATURE_KEY];
};

export const selectAllZoneCategories = createSelector(
  getZoneCategoriesState,
  selectAll
);

export const selectZoneCategoriesEntities = createSelector(
  getZoneCategoriesState,
  selectEntities
);
