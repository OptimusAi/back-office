import { connect } from 'react-redux';
import Zones from './results/zones/zones';
import {
  zonesSelectors,
  sendToEnforce,
  setActiveZone,
  setZoneFilter,
  markZoneAsEnforceable,
  releaseInfractionFromQueue,
} from '../../state/infractions.slice';
import { zoneStatus } from '../../enforcement.enums';

const getFilteredZones = (state) => {
  const zones = zonesSelectors.selectAll(state.enforcement.infractions.zones);
  let filteredZones = [];
  const activeFilter = state.enforcement.infractions.zoneFilter;
  if (activeFilter === zoneStatus.done) {
    filteredZones = zones.filter(
      (zone) => zone.completionRatio === zoneStatus.done
    );
  }
  if (activeFilter === zoneStatus.notDone) {
    filteredZones = zones.filter(
      (zone) => zone.completionRatio !== zoneStatus.done
    );
  }
  if (activeFilter === zoneStatus.none || activeFilter === '') {
    filteredZones = zones;
  }
  return filteredZones;
};

export const mapStateToProps = (state) => ({
  zones: getFilteredZones(state),
  activeZone: zonesSelectors.selectById(
    state.enforcement.infractions.zones,
    state.enforcement.infractions.activeZoneId
  ),
  permissions: state.permissions.permissions,
});

export const mapDispatchToProps = (dispatch) => ({
  onSelectZone: (zone) => {
    dispatch(setActiveZone(zone));
  },
  onSendToEnforce: async (zoneCategory) => {
    await dispatch(sendToEnforce(zoneCategory));
  },
  onZoneFilterSelect: (filter) => {
    dispatch(setZoneFilter(filter));
  },
  onMarkZone: (zone) => {
    dispatch(markZoneAsEnforceable(zone));
  },
  onRelease: () => {
    dispatch(releaseInfractionFromQueue());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Zones);
