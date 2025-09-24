import { connect } from 'react-redux';
import Enforcement from './enforcement';
import { releasePlateFromQueue } from './state/enforceable-infractions.slice';
import { releaseInfractionFromQueue } from './state/infractions.slice';
import { clearVerifySearchDate } from './state/infractions.slice';
import { clearEnforceSearchDate } from './state/enforceable-infractions.slice';

export const mapStateToProps = (state) => ({
  permissions: state.permissions.permissions,
});

export const mapDispatchToProps = (dispatch) => ({
  onClickAway: async () => {
    await dispatch(releaseInfractionFromQueue());
    await dispatch(releasePlateFromQueue());
    await dispatch(clearVerifySearchDate());
    await dispatch(clearEnforceSearchDate());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Enforcement);
