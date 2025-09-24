import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getPotentialInfractions,
  infractionUpdate,
  sendInfractionsToEnforce,
  getInfractionFromQueue,
  markZoneEnforceable,
  releaseInfraction,
  infractionsDeleteByZones,
  getOperatorsAndDevices,
} from '@park-plus/api';
import { mapErrors } from '../enforcement.mappers';
import { formatZones } from '../../app/app.mappers';
import {
  infractionStatus,
  requestStatus,
  zoneStatus,
} from '../enforcement.enums';
import { enforcementErrorKeys, getErrorMessage } from '../enforcement.errors';
import { getFormattedDate } from '../../utils/enforcement.utils';

export const INFRACTIONS_FEATURE_KEY = 'infractions';

export const zonesAdapter = createEntityAdapter();

export const fetchZonesBySearchDate = createAsyncThunk(
  'infractions/fetchZonesBySearchDate',
  async (date, { rejectWithValue, getState, dispatch }) => {
    const currentState = getState().enforcement.infractions;
    let zones = [];
    let response;
    let totals = null;

    if (currentState.activeInfractionId !== null) {
      await dispatch(releaseInfractionFromQueue());
    }

    response = await getPotentialInfractions(date);
    if (response.ok && response.data !== '') {
      zones = formatZones(response.data.zoneMetrics);
      totals = {
        totalInfractions: response.data.totalInfractions,
        totalObservations: response.data.totalObservations,
        totalRemainingInfractions: response.data.totalRemainingInfractions,
      };
    }
    return response.ok
      ? { zones, totals, date }
      : rejectWithValue({ date: date, error: response.errors });
  }
);

export const fetchOperatorsAndDevices = createAsyncThunk(
  'infractions/fetchOperatorsAndDevices',
  async (date, { rejectWithValue }) => {
    try {
      const response = await getOperatorsAndDevices(date);
      if (response.ok && response.data) {
        return {
          operatorNames: response.data.operatorNames,
          unitNumbers: response.data.unitNumbers,
        };
      } else {
        return rejectWithValue(
          response.errors || 'Failed to fetch operators and devices'
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.message ||
          'An error occurred while fetching operators and devices'
      );
    }
  }
);

export const refreshZonesBySearchDate = createAsyncThunk(
  'infractions/refreshZonesBySearchDate',
  async (date, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.infractions;
    let zones = [];
    let response;
    let totals = null;
    if (currentState.searchDate) {
      response = await getPotentialInfractions(currentState.searchDate);
      if (response.ok && response.data !== '') {
        zones = formatZones(response.data.zoneMetrics);
        totals = {
          totalInfractions: response.data.totalInfractions,
          totalObservations: response.data.totalObservations,
          totalRemainingInfractions: response.data.totalRemainingInfractions,
        };
      }
      return response.ok ? { zones, totals } : rejectWithValue(response.errors);
    } else {
      return rejectWithValue('no search date provided');
    }
  }
);

export const fetchInfractionFromQueue = createAsyncThunk(
  'infractions/fetchInfractionFromQueue',
  async (data, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.infractions;
    let currentZone = currentState.zones.entities[currentState.activeZoneId];
    const zones = currentState.zones.entities;
    if (!currentZone) {
      for (let value of Object.values(zones)) {
        if (value.completionRatio !== 1) {
          currentZone = value;
        }
      }
    }
    let response = await getInfractionFromQueue({
      zoneNumber: currentZone.zone,
      date: currentState.searchDate,
    });

    if (response.ok) {
      let i = 0;
      // fetching a new infraction from the queue if it has other status than VERIFIED
      const fetchInfraction = async (zone, infractionResponse) => {
        i++;
        if (
          infractionResponse.status !== infractionStatus.unverified &&
          i <= zone.totalInfractionsInZone
        ) {
          response = await getInfractionFromQueue({
            zoneNumber: currentZone.zone,
            date: currentState.searchDate,
          });
          if (
            response.ok &&
            infractionResponse.status !== infractionStatus.unverified
          ) {
            return fetchInfraction(currentZone, response.data);
          } else if (
            response.ok &&
            infractionResponse.status === infractionStatus.unverified
          ) {
            return response.data;
          } else {
            return rejectWithValue(response.errors);
          }
        } else {
          return response.data;
        }
      };
      return fetchInfraction(currentZone, response.data);
    } else {
      return rejectWithValue(response.errors);
    }
  }
);

export const updateInfraction = createAsyncThunk(
  'infractions/updateInfraction',
  async (infraction, { getState, rejectWithValue, dispatch }) => {
    const currentState = getState().enforcement.infractions;
    const currentInfraction = currentState.activeInfraction;
    const originalInfraction = currentState.originalActiveInfraction;
    const body = {
      enforcementPhotos: currentInfraction.enforcementPhotos,
      infractionId: currentInfraction.id,
      licencePlate: currentInfraction.licencePlate,
      event: currentInfraction.event || null,
      zone: currentInfraction.zone.zone,
    };
    if (currentInfraction !== originalInfraction) {
      const response = await infractionUpdate(currentInfraction.id, { body });
      const mappedErrors = response.errors
        ? mapErrors(response.errors)
        : response.errors;

      if (response.ok) {
        if (infraction.zone.zone !== response.data.zone.zone) {
          dispatch(setZoneUpdateMessage(response.data.zone.zone));
        }
        await dispatch(refreshZonesBySearchDate());
      }

      if (
        !response.ok &&
        response.errors[0].message.includes('not owned by user')
      ) {
        dispatch(fetchInfractionFromQueue());
      }
      return response.ok ? response.data : rejectWithValue(mappedErrors);
    } else {
      return currentInfraction;
    }
  }
);

export const sendToEnforce = createAsyncThunk(
  'infractions/sendToEnforce',
  async (zoneCategory, { getState, rejectWithValue, dispatch }) => {
    const selectedDate = getState().enforcement.infractions.searchDate;
    const response = await sendInfractionsToEnforce(selectedDate, zoneCategory);
    if (response.ok) {
      const alertDiv = document.createElement('div');
      alertDiv.textContent =
        'You have ' + response.data + ' Observations processed. ';
      alertDiv.style.position = 'fixed';
      alertDiv.style.top = '50%';
      alertDiv.style.left = '50%';
      alertDiv.style.transform = 'translate(-50%, -50%)';
      alertDiv.style.backgroundColor = '#4caf50';
      alertDiv.style.color = 'white';
      alertDiv.style.padding = '20px';
      alertDiv.style.borderRadius = '5px';
      alertDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      alertDiv.style.textAlign = 'center';
      const okButton = document.createElement('button');
      okButton.textContent = 'OK';
      okButton.style.display = 'block';
      okButton.style.margin = '10px auto 0';
      okButton.style.padding = '10px 20px';
      okButton.style.backgroundColor = '#ffffff';
      okButton.style.color = '#4caf50';
      okButton.style.border = 'none';
      okButton.style.borderRadius = '5px';
      okButton.style.cursor = 'pointer';
      okButton.addEventListener('click', () => {
        document.body.removeChild(alertDiv);
      });
      alertDiv.appendChild(okButton);
      document.body.appendChild(alertDiv);
      await dispatch(refreshZonesBySearchDate());
    }
    return response ? response : rejectWithValue(response.errors);
  }
);

export const deleteInfractions = createAsyncThunk(
  'infractions/infractionsDeleteByZones',
  async (deleteInfractions, { rejectWithValue }) => {
    const response = await infractionsDeleteByZones(deleteInfractions);
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const markZoneAsEnforceable = createAsyncThunk(
  'infractions/markZoneAsEnforceable',
  async (zone, { getState, rejectWithValue, dispatch }) => {
    const selectedDate = getState().enforcement.infractions.searchDate;
    const response = await markZoneEnforceable({
      date: selectedDate,
      zoneId: zone.zone,
    });

    if (response.ok) {
      if (response.status === 200) {
        await dispatch(refreshZonesBySearchDate());
        return response.data;
      }
      if (response.status === 202) {
        await dispatch(refreshZonesBySearchDate());
        await dispatch(fetchInfractionFromQueue());
        return response.data;
      }
      if (response.status === 206) {
        await dispatch(refreshZonesBySearchDate());
        await dispatch(fetchInfractionFromQueue());
        return rejectWithValue({
          type: 'error',
          message: getErrorMessage(
            enforcementErrorKeys.partiallyFailedEnforceableZone
          ),
          open: true,
        });
      }
    } else {
      if (response.status === 500) {
        await dispatch(fetchInfractionFromQueue());
        return rejectWithValue({
          type: 'error',
          message: getErrorMessage(enforcementErrorKeys.failedEnforceableZone),
          open: true,
        });
      } else {
        return rejectWithValue({
          type: 'error',
          message: getErrorMessage(
            enforcementErrorKeys.partiallyFailedEnforceableZone
          ),
          open: true,
        });
      }
    }
  }
);

export const releaseInfractionFromQueue = createAsyncThunk(
  'infractions/releaseInfractionFromQueue',
  async (data, { getState, rejectWithValue }) => {
    const currentState = getState().enforcement.infractions;
    if (currentState.activeInfraction === null) {
      return rejectWithValue('no infraction to release');
    } else {
      const formattedDate = getFormattedDate(
        currentState.activeInfraction.observations[0].observedAt
      );
      const body = {
        date: formattedDate,
        infractionId: currentState.activeInfraction.id,
      };
      const response = await releaseInfraction(currentState.activeZoneId, {
        body,
      });
      return response.ok ? response.data : rejectWithValue(response.errors);
    }
  }
);

const isClearMessageAction = (action) =>
  action.type.includes('clearErrorMessage');

const isClearInfractionRequestStatus = (action) => {
  return (
    action.type.includes('fetchInfractionFromQueue') &&
    action.type.endsWith('fulfilled')
  );
};

export const initialInfractionsState = {
  busy: false,
  error: null,
  activeZoneId: '',
  activeInfraction: null,
  originalActiveInfraction: null,
  searchDate: null,
  zones: zonesAdapter.getInitialState(),
  zoneUpdateMessage: null,
  zoneFilter: '',
  activeImageViewer: null,
  activeImage: -1,
  isEditing: false,
  operatorNames: [],
  unitNumbers: [],
};

export const infractionsSlice = createSlice({
  name: INFRACTIONS_FEATURE_KEY,
  initialState: initialInfractionsState,
  reducers: {
    setSearchDate: (state, action) => {
      state.searchDate = action.payload;
    },
    clearVerifySearchDate: (state) => {
      state.searchDate = null;
    },
    setZoneUpdateMessage: (state, action) => {
      state.zoneUpdateMessage = {
        message: action.payload,
        type: 'success',
        open: true,
      };
    },
    setZoneFilter: (state, action) => {
      let filteredZones = [];
      const zones = zonesSelectors.selectAll(state.zones);
      state.zoneFilter = action.payload;

      if (action.payload === zoneStatus.done) {
        filteredZones = zones.filter(
          (zone) => zone.completionRatio === zoneStatus.done
        );
      }
      if (action.payload === zoneStatus.notDone) {
        filteredZones = zones.filter(
          (zone) => zone.completionRatio !== zoneStatus.done
        );
      }
      if (action.payload === zoneStatus.none) {
        filteredZones = zones;
      }
      if (filteredZones.length > 0) {
        state.activeZoneId = filteredZones[0].id;
      } else {
        state.activeZoneId = '';
        state.activeInfraction = null;
        state.originalActiveInfraction = null;
      }
    },
    setActiveZone: (state, action) => {
      state.activeZoneId = action.payload.id;
      state.activeInfraction = null;
      state.originalActiveInfraction = null;
      state.infractionRequestStatus = undefined;
      state.error = null;
    },
    setActiveImageViewer: (state, action) => {
      state.activeImageViewer = action.payload;
    },
    setActiveImage: (state, action) => {
      state.activeImage = action.payload;
    },
    updateInfractionImages: (state, action) => {
      let updatedEnforcementPhotos = action.payload.enforcementPhotos.map(
        (photo, index) => {
          // Check if the updated photo is of type "PROFILE"
          if (action.payload.enforcementPhoto.imageType === 'PROFILE') {
            // If the current photo is also of type "PROFILE" and not the one being updated, uncheck it
            if (
              photo.imageType === 'PROFILE' &&
              index !== action.payload.index
            ) {
              return {
                ...photo,
                useToEnforce: false,
              };
            }
          }
          // Return the original photo if no changes are needed
          return photo;
        }
      );

      updatedEnforcementPhotos[action.payload.index] = {
        ...action.payload.enforcementPhoto,
        useToEnforce: action.payload.useToEnforce,
      };

      state.activeInfraction = {
        ...state.activeInfraction,
        enforcementPhotos: updatedEnforcementPhotos,
      };
    },
    updateLicencePlate: (state, action) => {
      const updatedLicencePlate = action.payload.licencePlate;
      state.activeInfraction = {
        ...state.activeInfraction,
        licencePlate: {
          ...updatedLicencePlate,
        },
      };
    },
    updateZone: (state, action) => {
      const updatedZone = action.payload.zone;
      state.activeInfraction = {
        ...state.activeInfraction,
        zone: {
          zone: updatedZone,
        },
      };
    },
    updateInfractionEvent: (state, action) => {
      state.activeInfraction = {
        ...state.activeInfraction,
        event: action.payload.event,
      };
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZonesBySearchDate.pending, (state) => {
        state.busy = true;
      })
      .addCase(fetchZonesBySearchDate.fulfilled, (state, action) => {
        zonesAdapter.setAll(state.zones, action.payload.zones);
        if (action.payload.zones.length > 0) {
          state.totals = action.payload.totals;
          state.activeZoneId = state.zones.ids[0];
          state.activeInfraction = null;
          state.infractionRequestStatus = undefined;
        } else {
          state.activeZoneId = '';
          state.totals =
            action.payload.totals === null
              ? {
                  totalInfractions: 0,
                  totalObservations: 0,
                  totalRemainingInfractions: 0,
                }
              : action.payload.totals;
        }
        state.busy = false;
        state.fetchedResults = true;
        state.searchDate = action.payload.date;
      })
      .addCase(fetchZonesBySearchDate.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
        state.fetchedResults = true;
        state.searchDate = action.payload.date;
      })

      .addCase(refreshZonesBySearchDate.pending, (state) => {
        state.busy = true;
      })
      .addCase(refreshZonesBySearchDate.fulfilled, (state, action) => {
        zonesAdapter.setAll(state.zones, action.payload.zones);
        const validActiveZone = action.payload.zones.filter(
          (z) => z.id === state.activeZoneId
        );
        const nextZoneWithUnverifiedInfractions = action.payload.zones.find(
          (z) => z.completionRatio !== 1
        );
        if (action.payload.zones.length > 0) {
          state.totals = action.payload.totals;
          state.activeZoneId =
            validActiveZone !== []
              ? state.activeZoneId
              : nextZoneWithUnverifiedInfractions.zone;
        } else {
          if (action.payload.totals === null) {
            state.totals = {
              totalInfractions: 0,
              totalObservations: 0,
              totalRemainingInfractions: 0,
            };
          } else {
            state.totals = action.payload.totals;
          }
        }
        state.busy = false;
      })
      .addCase(refreshZonesBySearchDate.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(fetchInfractionFromQueue.pending, (state) => {
        state.busy = true;
        state.infractionRequestStatus = requestStatus.inProgress;
      })
      .addCase(fetchInfractionFromQueue.fulfilled, (state, action) => {
        state.activeInfraction = action.payload;
        state.originalActiveInfraction = action.payload;
        state.activeZoneId = action.payload.zone.zone;
        state.busy = false;
      })
      .addCase(fetchInfractionFromQueue.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
        state.activeInfraction = null;
        state.originalActiveInfraction = null;
      })

      .addCase(updateInfraction.pending, (state) => {
        state.busy = true;
      })
      .addCase(updateInfraction.fulfilled, (state) => {
        state.activeInfraction = null;
        state.originalInfraction = null;
        state.busy = false;
      })
      .addCase(updateInfraction.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.payload;
        state.activeInfraction = {
          ...state.activeInfraction,
          event: undefined,
        };
      })

      .addCase(sendToEnforce.pending, (state) => {
        state.busy = true;
      })
      .addCase(sendToEnforce.fulfilled, (state) => {
        state.busy = false;
      })
      .addCase(sendToEnforce.rejected, (state, action) => {
        console.log(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(markZoneAsEnforceable.pending, (state) => {
        state.busy = true;
      })
      .addCase(markZoneAsEnforceable.fulfilled, (state) => {
        state.busy = false;
      })
      .addCase(markZoneAsEnforceable.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(releaseInfractionFromQueue.pending, (state) => {
        state.busy = true;
      })
      .addCase(releaseInfractionFromQueue.fulfilled, (state) => {
        state.activeInfraction = null;
        state.originalActiveInfraction = null;
        state.busy = false;
        state.infractionRequestStatus = undefined;
      })
      .addCase(releaseInfractionFromQueue.rejected, (state, action) => {
        console.info(action.payload);
        state.busy = false;
        state.error = action.error.message;
      })

      .addMatcher(isClearMessageAction, (state) => {
        state.busy = false;
        state.error = null;
        state.zoneUpdateMessage = null;
      })

      .addMatcher(isClearInfractionRequestStatus, (state) => {
        state.infractionRequestStatus = undefined;
      })

      .addDefaultCase((state) => state);
  },
});

export const infractionsReducer = infractionsSlice.reducer;

export const {
  setZoneUpdateMessage,
  setActiveZone,
  updateInfractionImages,
  updateLicencePlate,
  updateInfractionEvent,
  updateZone,
  previousInfraction,
  setZoneFilter,
  setActiveImageViewer,
  setActiveImage,
  setIsEditing,
  setSearchDate,
  clearVerifySearchDate,
} = infractionsSlice.actions;

export const infractionsActions = infractionsSlice.actions;

export const zonesSelectors = zonesAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = zonesSelectors;

export const getInfractionsState = (rootState) => {
  return rootState[INFRACTIONS_FEATURE_KEY];
};

export const selectAllZones = createSelector(getInfractionsState, selectAll);

export const selectInfractionsEntities = createSelector(
  getInfractionsState,
  selectEntities
);
