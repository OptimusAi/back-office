import { combineReducers } from 'redux';
import { INFRACTIONS_FEATURE_KEY, infractionsReducer } from "./infractions.slice";
import { ENFORCEABLE_INFRACTIONS_FEATURE_KEY, enforceableInfractionsReducer } from "./enforceable-infractions.slice";

export const ENFORCEMENT_FEATURE_KEY = 'enforcement';

export const enforcementReducer = combineReducers({
  [INFRACTIONS_FEATURE_KEY]: infractionsReducer,
  [ENFORCEABLE_INFRACTIONS_FEATURE_KEY]: enforceableInfractionsReducer,
});
