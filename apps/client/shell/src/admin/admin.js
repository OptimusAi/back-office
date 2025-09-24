import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useIntl } from 'react-intl';
import Roles from './pages/roles/roles.container';
import keys from '../languages/keys';
import { roleTypes } from './admin.enums';
import Forbidden from '../app/authentication/forbidden';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  navigation: {
    backgroundColor: theme.palette.grey.main,
  },
  panel: {
    overflowY: 'auto',
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

const Admin = ({ permissions }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [activeTab, setActiveTab] = React.useState(0);
  const onTabChange = (event, newValue) => setActiveTab(newValue);

  return permissions.includes(roleTypes[0]) ? (
    <div className={classes.container}>
      <AppBar position="static" elevation={0} className={classes.navigation}>
        <Tabs value={activeTab} onChange={onTabChange} indicatorColor="primary">
          <Tab label={intl.formatMessage({ id: keys.rolesTitle })} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} className={classes.panel}>
        <Roles />
      </TabPanel>
    </div>
  ) : (
    <Forbidden />
  );
};

export default Admin;
