import { connect } from 'react-redux';
import { licencePlateSelectors } from '../../state/enforceable-infractions.slice';
import Results from './results';
export const mapStateToProps = (state) => ({
  fetchedPlate: state.enforcement.enforceableInfractions.fetchedPlate,
  licencePlates: licencePlateSelectors.selectAll(
    state.enforcement.enforceableInfractions.licencePlates,
    state.enforcement.enforceableInfractions.activeLicencePlateId
  ),
});
export default connect(mapStateToProps)(Results);