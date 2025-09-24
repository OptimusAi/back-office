import { connect } from 'react-redux';
import Results from './results/results';
import {
  zonesSelectors,
  updateInfractionEvent,
  updateInfraction,
  setActiveImageViewer,
  setActiveImage,
} from '../../state/infractions.slice';

export const mapStateToProps = (state) => ({
  zones: zonesSelectors.selectAll(state.enforcement.infractions.zones),
  activeInfraction: state.enforcement.infractions.activeInfraction,
  activeImageViewer: state.enforcement.infractions.activeImageViewer,
  isEditing: state.enforcement.infractions.isEditing,
  fetchedResults: state.enforcement.infractions.fetchedResults,
  searchDate: state.enforcement.infractions.searchDate,
});

export const mapDispatchToProps = (dispatch) => ({
  onEventUpdate: async ({ activeInfraction, event }) => {
    if (activeInfraction === null) {
      return;
    }
    dispatch(updateInfractionEvent({ activeId: activeInfraction.id, event }));
    try {
      await dispatch(updateInfraction(activeInfraction));
    } catch (error) {
      console.log(error);
    }
  },
  onActiveImage: ({ isActive, index }) => {
    dispatch(setActiveImageViewer(isActive));
    dispatch(setActiveImage(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
