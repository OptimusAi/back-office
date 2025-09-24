import { combineReducers } from 'redux';
import { bylawsReducer, BYLAWS_FEATURE_KEY } from './bylaws.slice';
import { zoneCategoriesReducer, ZONE_CATEGORIES_FEATURE_KEY } from './zone-categories.slice';
import { ZONES_FEATURE_KEY, zonesReducer } from "./zones.slice";

export const MANAGEMENT_FEATURE_KEY = 'management';

export const managementReducer = combineReducers({
  [ZONES_FEATURE_KEY]: zonesReducer,
  [ZONE_CATEGORIES_FEATURE_KEY]: zoneCategoriesReducer,
  [BYLAWS_FEATURE_KEY]: bylawsReducer
});
