import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getLicencePlates,
  getLicencePlateFromQueue,
  getBylawsByZone,
  infractionUpdate,
  processPlateInfractions,
  refreshPlates,
  releasePlate,
  clearPlateFromDispatcher,
} from '@park-plus/api';
import { getInfractionDetails, mapErrors } from '../enforcement.mappers';
import {
  sortByDate,
  sortBylaws,
  getFormattedDate,
} from '../../utils/enforcement.utils';
import { infractionEvents, requestStatus } from '../enforcement.enums';
import { enforcementErrorKeys, getErrorMessage } from '../enforcement.errors';

export const ENFORCEABLE_INFRACTIONS_FEATURE_KEY = 'enforceableInfractions';

export const enforceableInfractionsAdapter = createEntityAdapter();

export const licencePlatesAdapter = createEntityAdapter();

export const refreshLicencePlates = createAsyncThunk(
  'enforceableInfractions/refreshLicencePlates',
  async (date, { getState, dispatch, rejectWithValue }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const currentInfractions = currentState.ids;
    const currentPlate = currentState.activeLicencePlateId;
    const currentInfraction =
      currentState.entities[currentState.activeInfractionId];
    const response = await refreshPlates(
      date,
      currentState.licencePlates.entities
    );
    if (response.ok && response.data.length >= 1) {
      const data = response.data[response.data.length - 1];
      let plates = data.plates ? data.plates : [];

      if (plates !== []) {
        plates.forEach((plate) => {
          plate.id = plate.number;
          return plate;
        });
      }
      const totals = {
        totalRemainingInfractions: data.totalRemainingInfractions,
      };

      if (
        currentInfractions.length === 1 &&
        currentInfraction.licencePlate.licencePlateNumber !== currentPlate
      ) {
        await dispatch(fetchLicencePlateFromQueue(currentState.searchDate));
      }

      return {
        plates,
        totals,
      };
    } else {
      rejectWithValue(response.errors);
    }
  }
);

export const fetchLicencePlateFromQueue = createAsyncThunk(
  'enforceableInfractions/fetchLicencePlateFromQueue',
  async (date, { getState, rejectWithValue, dispatch }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const searchedDate = currentState.searchDate;

    if (currentState.activeLicencePlateId !== null) {
      await dispatch(releasePlateFromQueue());
    }

    const platesResponse = await getLicencePlates(searchedDate);
    let plateResponse;
    let plates = [];
    let foundPlate;
    let totals = null;

    if (platesResponse?.data.length >= 1) {
      const data = platesResponse.data[platesResponse.data.length - 1];
      plates = data.plates;
      plates.forEach((plate) => {
        plate.id = plate.number;
        return plate;
      });
      totals = {
        totalRemainingInfractions: data.totalRemainingInfractions,
      };
      plateResponse = await getLicencePlateFromQueue(searchedDate);
      if (plateResponse.ok) {
        foundPlate = plates.find(
          (plate) => plate.number === plateResponse.data.toString()
        );
        while (!foundPlate) {
          plateResponse = await getLicencePlateFromQueue(searchedDate);
        }
      }
      if (
        platesResponse.ok &&
        plateResponse.ok &&
        platesResponse.data.length >= 1
      ) {
        return {
          plates,
          plate: foundPlate,
          totals,
        };
      } else {
        return rejectWithValue({
          error: platesResponse?.errors || plateResponse?.errors || null,
        });
      }
    } else {
      return rejectWithValue();
    }
  }
);

export const updateInfraction = createAsyncThunk(
  'enforceableInfractions/updateInfraction',
  async (activeInfraction, { getState, rejectWithValue, dispatch }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const currentInfraction =
      currentState.entities[currentState.activeInfractionId];
    const body = {
      enforcementPhotos: currentInfraction.enforcementPhotos,
      infractionId: currentInfraction.id,
      licencePlate: currentInfraction.licencePlate,
      event: infractionEvents.reverify,
      bylawId: currentInfraction.bylaw,
      zone: currentInfraction.zone,
      date: currentState.searchDate,
    };
    const response = await infractionUpdate(currentInfraction.id, { body });
    let fullPlateObj;

    if (response.ok) {
      await dispatch(refreshLicencePlates(currentState.searchDate));
      // workaround for completing licence plate object from backend's response
      const currentAppState = getState().app;
      let licencePlateObjResponse = { ...response.data.licencePlate };
      const countrySubdivision = {
        ...currentAppState.regions.entities[
          licencePlateObjResponse.countrySubdivision.code
        ],
      };
      delete countrySubdivision.id;
      fullPlateObj = {
        ...licencePlateObjResponse,
        countrySubdivision,
      };
    }

    const mappedErrors = response.errors
      ? mapErrors(response.errors)
      : response.errors;

    if (
      response.errors &&
      response.errors[0].message.includes('not owned by user')
    ) {
      await dispatch(fetchLicencePlateFromQueue(currentState.searchDate));
    }

    return response.ok
      ? {
          ...response.data,
          licencePlate: fullPlateObj,
          zone: response.data.zone,
        }
      : rejectWithValue(mappedErrors);
  }
);

export const getInfractionBylaws = createAsyncThunk(
  'enforceableInfractions/getInfractionBylaws',
  async (zoneNumber, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const currentInfraction =
      currentState.entities[currentState.activeInfractionId];
    const response = await getBylawsByZone(
      currentInfraction.zone.zone || currentInfraction.zone
    );
    return response.ok
      ? sortBylaws(response.data)
      : rejectWithValue(response.errors);
  }
);

export const clearPlate = createAsyncThunk(
  'enforceableInfractions/clearPlate',
  async (data, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const response = await clearPlateFromDispatcher(
      currentState.activeLicencePlateId
    );
    return response.ok ? response.data : rejectWithValue(response.errors);
  }
);

export const processInfractions = createAsyncThunk(
  'enforceableInfractions/processInfractions',
  async (licencePlateInfractions, { getState, rejectWithValue, dispatch }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    const formattedDate = getFormattedDate(currentState.searchDate);
    const body = {
      date: formattedDate,
      infractionDetails: getInfractionDetails(licencePlateInfractions),
      plate: currentState.activeLicencePlateId,
    };
    const response = await processPlateInfractions({ body });

    if (response.ok) {
      await dispatch(clearPlate());
    }

    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const releasePlateFromQueue = createAsyncThunk(
  'enforceableInfractions/releasePlateFromQueue',
  async (data, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.enforceableInfractions;
    if (currentState.activeLicencePlateId === null) {
      return rejectWithValue('no plate to release');
    } else {
      const infractionDate =
        currentState.licencePlates.entities[currentState.activeLicencePlateId]
          .zones[0].infractions[0].observations[0].observedAt;
      const response = await releasePlate(infractionDate);
      return response.ok ? response.data : rejectWithValue(response.errors);
    }
  }
);

const isClearMessageAction = (action) =>
  action.type.includes('clearErrorMessage');

const isClearPlateRequestStatus = (action) => {
  return (
    action.type.includes('fetchLicencePlateFromQueue') &&
    action.type.endsWith('fulfilled')
  );
};

export const initialInfractionsState = enforceableInfractionsAdapter.getInitialState(
  {
    busy: false,
    error: null,
    activeInfractionId: null,
    activeLicencePlateId: null,
    licencePlates: licencePlatesAdapter.getInitialState(),
    searchDate: null,
    regions: [],
    availableBylaws: null,
    activeImageViewer: null,
    activeImage: -1,
    isEditing: false,
  }
);

export const enforceableInfractionsSlice = createSlice({
  name: ENFORCEABLE_INFRACTIONS_FEATURE_KEY,
  initialState: initialInfractionsState,
  reducers: {
    setSearchDate: (state, action) => {
      state.searchDate = action.payload;
    },
    clearEnforceSearchDate: (state) => {
      state.searchDate = null;
    },
    setActiveImageViewer: (state, action) => {
      state.activeImageViewer = action.payload;
    },
    setActiveImage: (state, action) => {
      state.activeImage = action.payload;
    },
    selectInfractionId: (state, action) => {
      state.activeInfractionId = action.payload;
      state.availableBylaws = null;
      state.activeInfractionEvent = undefined;
    },
    updateInfractionImages: (state, action) => {
      let updatedPhoto = {
        ...action.payload.enforcementPhoto,
        useToEnforce: action.payload.useToEnforce,
      };
      let updatedEnforcementPhotos = [...action.payload.enforcementPhotos];
      updatedEnforcementPhotos[action.payload.index] = updatedPhoto;
      enforceableInfractionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          enforcementPhotos: [...updatedEnforcementPhotos],
        },
      });
    },
    updateLicencePlate: (state, action) => {
      const updatedLicencePlate = action.payload.licencePlate;
      enforceableInfractionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          licencePlate: {
            ...updatedLicencePlate,
          },
        },
      });
    },
    updateZone: (state, action) => {
      const updatedZone = action.payload.zone;
      enforceableInfractionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          zone: updatedZone,
          bylaw: null,
        },
      });
      state.availableBylaws = null;
    },
    updateInfractionBylaw: (state, action) => {
      enforceableInfractionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          bylaw: action.payload.bylaw,
        },
      });
    },
    updateInfractionEvent: (state, action) => {
      enforceableInfractionsAdapter.updateOne(state, {
        id: action.payload.activeInfractionId,
        changes: {
          event: action.payload.event,
        },
      });
      state.activeInfractionEvent = action.payload.event;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateInfraction.pending, (state) => {
        state.busy = true;
      })
      .addCase(updateInfraction.fulfilled, (state, action) => {
        enforceableInfractionsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            zone: action.payload.zone.zone,
            enforcementPhotos: action.payload.enforcementPhotos,
            licencePlate: action.payload.licencePlate,
            status: action.payload.status,
            address: action.payload.zone.address,
          },
        });
        state.busy = false;
      })
      .addCase(updateInfraction.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(refreshLicencePlates.pending, (state) => {
        state.busy = true;
      })
      .addCase(refreshLicencePlates.fulfilled, (state, action) => {
        state.totals = action.payload.totals;
        licencePlatesAdapter.setAll(state.licencePlates, action.payload.plates);
        state.busy = false;
      })
      .addCase(refreshLicencePlates.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(getInfractionBylaws.pending, (state) => {
        state.busy = true;
      })
      .addCase(getInfractionBylaws.fulfilled, (state, action) => {
        state.availableBylaws = action.payload;
        state.busy = false;
      })
      .addCase(getInfractionBylaws.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(clearPlate.pending, (state) => {
        state.busy = true;
      })
      .addCase(clearPlate.fulfilled, (state, action) => {
        state.busy = false;
        state.fetchedPlate = false;
        state.activeLicencePlateId = null;
        state.activeInfractionId = null;
        state.originalActiveInfraction = undefined;
        state.availableBylaws = null;
        enforceableInfractionsAdapter.setAll(state, {});
      })
      .addCase(clearPlate.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(processInfractions.pending, (state) => {
        state.busy = true;
      })
      .addCase(processInfractions.fulfilled, (state, action) => {
        state.busy = false;
      })
      .addCase(processInfractions.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
        if (
          action.payload.message ===
          getErrorMessage(enforcementErrorKeys.permissible)
        ) {
          state.activeInfractionEvent = undefined;
        }
        if (
          action.payload.message ===
          getErrorMessage(enforcementErrorKeys.plateNotAssigned)
        ) {
          state.activeLicencePlateId = null;
          state.activeInfractionId = null;
          state.availableBylaws = null;
          state.activeInfractionEvent = undefined;
          state.fetchedPlate = false;
          state.originalActiveInfraction = undefined;
        }
      })

      .addCase(fetchLicencePlateFromQueue.pending, (state) => {
        state.busy = true;
        state.plateRequestStatus = requestStatus.inProgress;
      })
      .addCase(fetchLicencePlateFromQueue.fulfilled, (state, action) => {
        if (action.payload.plates.length >= 1) {
          const plateInfractions = [];
          const activeLicencePlateZones = action.payload.plate.zones;
          activeLicencePlateZones.forEach((zone) => {
            return zone.infractions.forEach((i) => {
              return plateInfractions.push(i);
            });
          });

          const sortedInfractions = sortByDate(plateInfractions);

          state.activeLicencePlateId = action.payload.plate.id;
          state.activeInfractionId = sortedInfractions[0].id;
          state.originalActiveInfraction = sortedInfractions[0];
          state.availableBylaws = null;
          state.activeInfractionEvent = undefined;
          state.totals = action.payload.totals;

          licencePlatesAdapter.setAll(
            state.licencePlates,
            action.payload.plates
          );
          enforceableInfractionsAdapter.setAll(state, sortedInfractions);
        } else {
          licencePlatesAdapter.setAll(state.licencePlates, {});
          enforceableInfractionsAdapter.setAll(state, {});
          state.totals =
            action.payload.totals === null
              ? { totalRemainingInfractions: 0 }
              : action.payload.plates.totals;
        }
        state.fetchedPlate = true;
        state.busy = false;
      })
      .addCase(fetchLicencePlateFromQueue.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
        state.totals = undefined;
        state.activeLicencePlateId = null;
        state.activeInfractionId = null;
        state.originalActiveInfraction = undefined;
        state.availableBylaws = null;
        state.activeInfractionEvent = undefined;
        state.fetchedPlate = true;
      })

      .addCase(releasePlateFromQueue.pending, (state) => {
        state.busy = true;
      })
      .addCase(releasePlateFromQueue.fulfilled, (state, action) => {
        enforceableInfractionsAdapter.setAll(state, {});
        state.activeLicencePlateId = null;
        state.activeInfraction = undefined;
        state.originalActiveInfraction = undefined;
        state.activeInfractionId = null;
        state.busy = false;
      })
      .addCase(releasePlateFromQueue.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addMatcher(isClearMessageAction, (state) => {
        state.busy = false;
        state.error = null;
      })

      .addMatcher(isClearPlateRequestStatus, (state) => {
        state.plateRequestStatus = undefined;
      })

      .addDefaultCase((state) => state);
  },
});

export const enforceableInfractionsReducer =
  enforceableInfractionsSlice.reducer;

export const {
  selectInfractionId,
  updateInfractionImages,
  updateLicencePlate,
  updateZone,
  updateInfractionBylaw,
  updateInfractionEvent,
  nextPlate,
  setActiveImage,
  setActiveImageViewer,
  setIsEditing,
  setSearchDate,
  clearEnforceSearchDate,
} = enforceableInfractionsSlice.actions;

export const enforceableInfractionsActions =
  enforceableInfractionsSlice.actions;

export const enforceableInfractionsSelectors = enforceableInfractionsAdapter.getSelectors();

export const licencePlateSelectors = licencePlatesAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = enforceableInfractionsSelectors;

export const getInfractionsState = (rootState) => {
  return rootState[ENFORCEABLE_INFRACTIONS_FEATURE_KEY];
};

export const selectAllInfractions = createSelector(
  getInfractionsState,
  selectAll
);

export const selectInfractionsEntities = createSelector(
  getInfractionsState,
  selectEntities
);
