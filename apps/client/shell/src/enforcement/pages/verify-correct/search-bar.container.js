import { connect } from 'react-redux';
import {
  fetchZonesBySearchDate,
  setIsEditing,
  setSearchDate
} from '../../state/infractions.slice';
import SearchBar from '../../shared/search-bar';

export const mapStateToProps = (state) => ({
  searchDate: state.enforcement.infractions.searchDate,
  totals: state.enforcement.infractions.totals,
});

export const mapDispatchToProps = (dispatch) => ({
  onSearch: async (date) => {
    dispatch(setSearchDate(date));
    await dispatch(fetchZonesBySearchDate(date));
  },
  onEditing: (isEditing) => {
    dispatch(setIsEditing(isEditing));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
