import { connect } from 'react-redux';
import BusyAware from './components/busy-aware';

export const mapStateToProps = (state) => ({
  busy: state.app.busy,
});

export default connect(mapStateToProps)(BusyAware);