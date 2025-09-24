import { connect } from 'react-redux';
import { getParkPlusClient, getRegions, getZones } from './state/app.slice';
import Page from './components/page';
import { releaseInfractionFromQueue } from '../enforcement/state/infractions.slice';
import { releasePlateFromQueue } from '../enforcement/state/enforceable-infractions.slice';

export const mapStateToProps = (state) => ({
  client: state.app.client,
  connected: state.app.connected,
  permissions: state.permissions.permissions,
  activeInfraction: state.enforcement.infractions.activeInfraction,
  activeLicencePlateId:
    state.enforcement.enforceableInfractions.activeLicencePlateId,
});

export const mapDispatchToProps = (dispatch) => ({
  getClient: (clientId) => {
    if (clientId) {
      dispatch(getParkPlusClient(clientId));
      dispatch(getZones());
      dispatch(getRegions());
    }
  },
  onClickAway: async () => {
    await dispatch(releaseInfractionFromQueue());
    await dispatch(releasePlateFromQueue());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
