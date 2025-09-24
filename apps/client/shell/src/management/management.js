import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { useIntl } from 'react-intl';
import ZoneManager from './pages/zones/zone-manager';
import ZoneCategoriesManager from './pages/zone-categories/zone-categories-manager';
import BylawManager from './pages/bylaws/bylaw.manager';
import keys from '../languages/keys';

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
  const { children, value, index, className } = props;

  return (
    <div hidden={value !== index} className={className}>
      {value === index && children}
    </div>
  );
};

const Management = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const intl = useIntl();
  const onTabChange = (event, value) => setActiveTab(value);

  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.navigation}>
        <Tabs
          onChange={onTabChange}
          selectionFollowsFocus
          value={activeTab}
          indicatorColor="primary"
        >
          <Tab label={intl.formatMessage({ id: keys.zonesTitle })} />
          <Tab label={intl.formatMessage({ id: keys.zoneCategoriesTitle })} />
          <Tab label={intl.formatMessage({ id: keys.bylawTitle })} />
        </Tabs>
      </AppBar>
      <TabPanel index={0} value={activeTab} className={classes.panel}>
        <ZoneManager />
      </TabPanel>
      <TabPanel index={1} value={activeTab} className={classes.panel}>
        <ZoneCategoriesManager />
      </TabPanel>
      <TabPanel index={2} value={activeTab} className={classes.panel}>
        <BylawManager />
      </TabPanel>
    </div>
  );
};

export default Management;
