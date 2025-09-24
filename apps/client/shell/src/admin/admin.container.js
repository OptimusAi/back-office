import { connect } from 'react-redux';
import Admin from './admin';


export const mapStateToProps = (state) => ({
  permissions: state.permissions.permissions
});


export default connect(mapStateToProps)(Admin);