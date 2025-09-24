import { connect } from 'react-redux';
import { getZones } from '../../../app/state/app.slice';
import { getBylaws } from '../../state/bylaws.slice';
import {
  setActiveZoneCategory,
  setActiveZoneCategoryEditor,
  zoneCategoriesSelectors,
  updateZoneCategory,
  setActiveZoneCategoryAdder,
  addZoneCategory,
  associateBylaws,
  getAssociatedBylaws,
  removeAssociatedBylaws,
  deleteZoneCategory,
  setDefaultBylaw,
} from '../../state/zone-categories.slice';
import { getZoneCategories } from '../../state/zones.slice';

import ZoneCategories from './zone-categories';

export const mapStateToProps = (state) => ({
  zoneCategories: zoneCategoriesSelectors.selectAll(
    state.management.zoneCategories
  ),
  bylawsList: state.management.zoneCategories.bylawsList,
  activeZoneCategoryEditor:
    state.management.zoneCategories.activeZoneCategoryEditor,
  activeZoneCategoryAdder:
    state.management.zoneCategories.activeZoneCategoryAdder,
  activeZoneCategory: zoneCategoriesSelectors.selectById(
    state.management.zoneCategories,
    state.management.zoneCategories.activeZoneCategoryId
  ),
  activeZoneCategoryId: state.management.zoneCategories.activeZoneCategoryId,
  activeZoneCategoryBylaws:
    state.management.zoneCategories.activeZoneCategoryBylaws,
  defaultBylaw: state.management.zoneCategories.defaultBylaw,
  permissions: state.permissions.permissions,
  fetchedZoneCategories: state.management.zones.fetchedZoneCategories,
  fetchedBylaws: state.management.bylaws.fetchedBylaws,
});

export const mapDispatchToProps = (dispatch) => ({
  onZoneCategoriesRequest: () => {
    dispatch(getZoneCategories());
  },
  onAssociatedBylawsRequest: () => {
    dispatch(getAssociatedBylaws());
  },
  onSelectedZoneCategory: (zoneCategoryId) => {
    dispatch(setActiveZoneCategory(zoneCategoryId));
  },
  onZoneCategoryUpdate: async (updatedZoneCategory) => {
    try {
      await dispatch(updateZoneCategory(updatedZoneCategory));
      await dispatch(getZones());
      await dispatch(getZoneCategories());
    } catch (error) {
      console.log(error);
    }
  },
  onZoneCategoryAdd: async ({ name, description, bylaws }) => {
    try {
      await dispatch(addZoneCategory({ name, description, bylaws }));
      await dispatch(getZoneCategories());
      await dispatch(getZones());
      dispatch(setActiveZoneCategoryAdder(false));
    } catch (error) {
      console.log(error);
    }
  },
  onEdit: (isActive) => {
    dispatch(setActiveZoneCategoryEditor(isActive));
  },
  onAdd: (isActive) => {
    dispatch(setActiveZoneCategoryAdder(isActive));
  },
  onBylawsRequest: () => {
    dispatch(getBylaws());
  },
  onRemoveBylawAssociations: ({ bylawsIds }) => {
    dispatch(removeAssociatedBylaws({ bylawsIds }));
  },
  onAddBylawAssociations: async (bylawsAssociations) => {
    try {
      await dispatch(associateBylaws({ bylawsAssociations }));
      await dispatch(getZoneCategories());
    } catch (error) {
      console.log(error);
    }
  },
  onDelete: async (zoneCategoryId) => {
    try {
      await dispatch(deleteZoneCategory(zoneCategoryId));
      await dispatch(getZoneCategories());
      await dispatch(getZones());
    } catch (error) {
      console.log(error);
    }
  },
  onSelectDefaultBylaw: (bylaw) => {
    dispatch(setDefaultBylaw(bylaw));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ZoneCategories);
