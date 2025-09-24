import { connect } from 'react-redux';
import Management from './management';

export const mapStateToProps = (state) => ({
  permissions: state.permissions.permissions,
});

export default connect(mapStateToProps)(Management);
