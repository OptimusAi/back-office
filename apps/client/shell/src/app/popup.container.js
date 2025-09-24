import 'regenerator-runtime/runtime';
import { connect } from 'react-redux';
import Popup from './components/popup';
import { clearErrorMessage } from './state/app.slice';

export const mapStateToProps = (state) => ({
  message: state.app.error ? state.app.error.message : null,
  type: state.app.error ? state.app.error.type : null,
  open: state.app.error ? state.app.error.open : false,
});

export const mapDispatchToProps = (dispatch) => ({
  onClearMessage: () => {
    dispatch(clearErrorMessage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
