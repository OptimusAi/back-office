import React from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import VerifyCorrect from '../verify-correct/verify-correct';
import Enforce from '../enforce/enforce';
import keys from '../../../languages/keys';
import TabPanel from '../../shared/tab-panel';
import DeletionInfractions from './deletion-infraction';

const useStyles = makeStyles((theme) => ({
  navigation: {
    backgroundColor: theme.palette.grey.main,
  },
}));

const VerificationEnforcementProcess = ({ activeTab, onTabChange }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <AppBar position="static" elevation={0} className={classes.navigation}>
        <Tabs value={activeTab} onChange={onTabChange} indicatorColor="primary">
          <Tab label={intl.formatMessage({ id: keys.verifyCorrectTitle })} />
          <Tab label={intl.formatMessage({ id: keys.enforceTitle })} />
          <Tab label={intl.formatMessage({ id: keys.deletionTitle })} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} className={classes.panel}>
        <VerifyCorrect />
      </TabPanel>
      <TabPanel value={activeTab} index={1} className={classes.panel}>
        <Enforce />
      </TabPanel>
      <TabPanel value={activeTab} index={2} className={classes.panel}>
        <DeletionInfractions />
      </TabPanel>
    </>
  );
};

export default VerificationEnforcementProcess;
