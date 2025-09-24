import React from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import keys from '../../../languages/keys';
import TabPanel from '../../shared/tab-panel';
import Enforce from './enforce';

const useStyles = makeStyles((theme) => ({
  navigation: {
    backgroundColor: theme.palette.grey.main,
  },
}));

const EnforcementProcess = ({ activeTab, onTabChange }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <AppBar position="static" elevation={0} className={classes.navigation}>
        <Tabs value={activeTab} onChange={onTabChange} indicatorColor="primary">
          <Tab label={intl.formatMessage({ id: keys.enforceTitle })} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} className={classes.panel}>
        <Enforce />
      </TabPanel>
    </>
  );
};

export default EnforcementProcess;
