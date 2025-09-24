import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getAllBylaws,
  bylawUpdate,
  bylawAdd,
  bylawDelete,
} from '@park-plus/api';
import { mapErrors } from '../management.mappers';

export const BYLAWS_FEATURE_KEY = 'bylaws';

export const bylawsAdapter = createEntityAdapter();

export const getBylaws = createAsyncThunk(
  'bylaws/getBylaws',
  async (data, { rejectWithValue }) => {
    const response = await getAllBylaws();
    return response.ok ? response.data : rejectWithValue(response.errors);
  }
);

export const updateBylaw = createAsyncThunk(
  'bylaws/updateBylaw',
  async (bylaw, { getState, rejectWithValue }) => {
    const currentState = getState().management.bylaws;
    const currentBylaw = currentState.entities[currentState.activeBylawId];
    const body = { ...bylaw };
    const response = await bylawUpdate(currentBylaw.id, { body });
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const addBylaw = createAsyncThunk(
  'bylaws/addBylaw',
  async (bylaw, { rejectWithValue }) => {
    const body = { ...bylaw };
    const response = await bylawAdd({ body });
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

export const deleteBylaw = createAsyncThunk(
  'bylaws/deleteBylaw',
  async (bylawId, { rejectWithValue }) => {
    const response = await bylawDelete(bylawId);
    return response.ok
      ? response.data
      : rejectWithValue(mapErrors(response.errors));
  }
);

const isClearMessageAction = (action) =>
  action.type.includes('clearErrorMessage');

export const initialBylawsState = bylawsAdapter.getInitialState({
  activeBylawId: '',
  error: null,
  newBylaw: null,
  fetchedBylaws: false,
});

export const bylawsSlice = createSlice({
  name: BYLAWS_FEATURE_KEY,
  initialState: initialBylawsState,
  reducers: {
    setActiveBylaw: (state, action) => {
      state.activeBylawId = action.payload;
      state.error = null;
    },
    setActiveBylawEditor: (state, action) => {
      state.activeBylawEditor = action.payload;
    },
    setActiveBylawAdder: (state, action) => {
      state.activeBylawAdder = action.payload;
    },
    updateNewBylaw: (state, action) => {
      state.newBylaw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBylaws.pending, (state) => {
        state.busy = true;
      })
      .addCase(getBylaws.fulfilled, (state, action) => {
        bylawsAdapter.setAll(state, action.payload);
        state.fetchedBylaws = true;
        state.busy = false;
      })
      .addCase(getBylaws.rejected, (state, action) => {
        state.fetchedBylaws = true;
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(updateBylaw.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(updateBylaw.fulfilled, (state, action) => {
        bylawsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            code: action.payload.code,
            sectionCode: action.payload.sectionCode,
            description: action.payload.description,
          },
        });
        state.busy = false;
        state.activeBylawEditor = false;
        state.error = null;
      })
      .addCase(updateBylaw.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })

      .addCase(addBylaw.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(addBylaw.fulfilled, (state, action) => {
        state.busy = false;
        state.activeBylawAdder = false;
        state.error = null;
        state.newBylaw = null;
      })
      .addCase(addBylaw.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      })
      .addCase(deleteBylaw.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(deleteBylaw.fulfilled, (state) => {
        state.busy = false;
        state.error = null;
      })
      .addCase(deleteBylaw.rejected, (state, action) => {
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

export const bylawsReducer = bylawsSlice.reducer;

export const {
  setActiveBylaw,
  setActiveBylawEditor,
  setActiveBylawAdder,
  updateNewBylaw,
} = bylawsSlice.actions;

export const bylawsActions = bylawsSlice.actions;

export const bylawsSelectors = bylawsAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = bylawsSelectors;

export const getBylawsState = (rootState) => {
  return rootState[BYLAWS_FEATURE_KEY];
};

export const selectAllBylaws = createSelector(getBylawsState, selectAll);

export const selectBylawsEntities = createSelector(
  getBylawsState,
  selectEntities
);
