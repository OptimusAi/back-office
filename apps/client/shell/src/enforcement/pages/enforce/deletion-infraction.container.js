import { connect } from 'react-redux';
import DeleteInfractions from './deletion-infraction';
import {
  fetchOperatorsAndDevices,
  deleteInfractions,
} from '../../state/infractions.slice';

const mapStateToProps = (state) => ({
  operators: state.infractions.operatorNames || [],
  unitNumbers: state.infractions.unitNumbers || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchOperatorsAndDevices: (date) => dispatch(fetchOperatorsAndDevices(date)),
  deleteInfractions: async (payload) => {
    try {
      const response = await dispatch(deleteInfractions(payload));
      return response.payload || 0; // Return the deleted count
    } catch (error) {
      console.error('Error deleting infractions:', error);
      throw error;
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteInfractions);
