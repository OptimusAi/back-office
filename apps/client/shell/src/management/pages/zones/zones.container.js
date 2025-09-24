import { connect } from 'react-redux';
import Zones from './zones';
import {
  zonesSelectors,
  getZoneCategories,
  getZoneCities,
  setActiveZone,
  updateZone,
  deleteZone,
  addZone,
  setActiveZoneEditor,
  setActiveZoneAdder,
} from '../../state/zones.slice';
import { getZones } from '../../../app/state/app.slice';

export const mapStateToProps = (state) => ({
  zones: zonesSelectors.selectAll(state.app.zones),
  activeZone: zonesSelectors.selectById(state.app.zones, state.management.zones.activeZoneId),
  activeZoneId: state.management.zones.activeZoneId,
  zoneCategoriesList: state.management.zones.zoneCategoriesList,
  zoneCitiesList: state.management.zones.zoneCitiesList,
  activeZoneEditor: state.management.zones.activeZoneEditor,
  activeZoneAdder: state.management.zones.activeZoneAdder,
  permissions: state.permissions.permissions,
});

export const mapDispatchToProps = (dispatch) => ({
  onZonesRequest: () => {
    dispatch(getZones());
  },
  onZoneCategoriesRequest: () => {
    dispatch(getZoneCategories());
  },
  onZoneCitiesRequest: () => {
    dispatch(getZoneCities());
  },
  onSelectedZone: (zoneId) => {
    dispatch(setActiveZone(zoneId));
  },
  onZoneUpdate: async (updatedZone) => {
    try {
      await dispatch(updateZone(updatedZone));
    } catch (error) {
      console.log(error);
    }
  },
  onZoneAdd: async (zone) => {
    try {
      await dispatch(addZone(zone));
      await dispatch(getZones());
    } catch (error) {
      console.log(error);
    }
  },
  onEdit: (isActive) => {
    dispatch(setActiveZoneEditor(isActive))
  },
  onDelete: async (zone) => {
    try {
      await dispatch(deleteZone(zone));
      await dispatch(getZones());
    } catch (error) {
      console.log(error);
    }
  },
  onAdd: (isActive) => {
    dispatch(setActiveZoneAdder(isActive));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Zones);
