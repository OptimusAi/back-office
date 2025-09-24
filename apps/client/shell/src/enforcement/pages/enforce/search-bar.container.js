import 'regenerator-runtime/runtime';
import { connect } from 'react-redux';
import SearchBar from '../../shared/search-bar';
import {
  fetchLicencePlateFromQueue,
  setIsEditing,
  setSearchDate,
} from '../../state/enforceable-infractions.slice';

export const mapStateToProps = (state) => ({
  searchDate: state.enforcement.enforceableInfractions.searchDate,
  totals: state.enforcement.enforceableInfractions.totals,
});

export const mapDispatchToProps = (dispatch) => ({
  onSearch: async (date) => {
    dispatch(setSearchDate(date));
    await dispatch(fetchLicencePlateFromQueue());
  },
  onEditing: (isEditing) => {
    dispatch(setIsEditing(isEditing));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
