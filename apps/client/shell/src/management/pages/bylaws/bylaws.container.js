import { connect } from 'react-redux';
import {
  getBylaws,
  setActiveBylaw,
  setActiveBylawEditor,
  bylawsSelectors,
  updateBylaw,
  setActiveBylawAdder,
  addBylaw,
  updateNewBylaw,
  deleteBylaw,
} from '../../state/bylaws.slice';
import Bylaws from './bylaws';

export const mapStateToProps = (state) => ({
  bylaws: bylawsSelectors.selectAll(state.management.bylaws),
  activeBylawEditor: state.management.bylaws.activeBylawEditor,
  activeBylawAdder: state.management.bylaws.activeBylawAdder,
  newBylaw: state.management.bylaws.newBylaw,
  activeBylaw: bylawsSelectors.selectById(
    state.management.bylaws,
    state.management.bylaws.activeBylawId
  ),
  permissions: state.permissions.permissions,
  fetchedBylaws: state.management.bylaws.fetchedBylaws,
});

export const mapDispatchToProps = (dispatch) => ({
  onBylawsRequest: () => {
    dispatch(getBylaws());
  },
  onSelectedBylaw: (bylawId) => {
    dispatch(setActiveBylaw(bylawId));
  },
  onBylawUpdate: async (updatedBylaw) => {
    try {
      await dispatch(updateBylaw(updatedBylaw));
    } catch (error) {
      console.log(error);
    }
  },
  onBylawAdd: async (bylaw) => {
    try {
      await dispatch(addBylaw(bylaw));
      await dispatch(getBylaws());
    } catch (error) {
      console.log(error);
    }
  },
  onEdit: (isActive) => {
    dispatch(setActiveBylawEditor(isActive));
  },
  onAdd: (isActive) => {
    dispatch(setActiveBylawAdder(isActive));
  },
  onNewBylawUpdate: (bylaw) => {
    dispatch(updateNewBylaw(bylaw));
  },
  onDelete: async (bylawId) => {
    try {
      await dispatch(deleteBylaw(bylawId));
      await dispatch(getBylaws());
    } catch (error) {
      console.log(error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bylaws);
