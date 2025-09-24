import { connect } from 'react-redux';
import Infractions from './results/infractions/infractions';
import {
  infractionsSelectors,
  setActiveInfractionId,
  updateInfraction,
} from '../../state/infractions.slice';

export const mapStateToProps = (state) => ({
  activeZone: infractionsSelectors.selectById(
    state.enforcement.infractions.zones,
    state.enforcement.infractions.activeZoneId
  ),
  activeInfraction: state.enforcement.infractions.activeInfraction,
  activeInfractionId: state.enforcement.infractions.activeInfractionId,
  infractions: infractionsSelectors.selectAll(state.enforcement.infractions),
});

export const mapDispatchToProps = (dispatch) => ({
  onSelectInfraction: async (infractionId) => {
    try {
      await dispatch(updateInfraction());
      dispatch(setActiveInfractionId(infractionId));
    } catch (error) {
      console.log(error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Infractions);
