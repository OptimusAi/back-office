import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VerificationEnforcementProcess from './pages/enforce/verification-enforcement.process';
import VerificationProcess from './pages/enforce/verification.process';
import EnforcementProcess from './pages/enforce/enforcement.process';
import { roleTypes } from '../admin/admin.enums';
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

const Enforcement = ({ permissions, onClickAway }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [fullDisplay, setFullDisplay] = useState(false);
  const isVerification = permissions.includes(roleTypes[2]);
  const isEnforcement = permissions.includes(roleTypes[1]);

  const isMixedAdmin = () => {
    if (permissions.length === 2) {
      if (permissions.includes(roleTypes[0])) {
        if (
          permissions.includes(roleTypes[1]) ||
          permissions.includes(roleTypes[2])
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  const onTabChange = (event, newValue) => {
    onClickAway();
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (
      permissions.includes(roleTypes[1]) &&
      permissions.includes(roleTypes[2])
    ) {
      setFullDisplay(true);
    }
  }, [permissions]);

  return (
    <div className={classes.container}>
      {(!isVerification || !isEnforcement) && !isMixedAdmin && <Forbidden />}

      {fullDisplay && (
        <VerificationEnforcementProcess
          onTabChange={onTabChange}
          activeTab={activeTab}
        />
      )}
      {permissions.includes(roleTypes[2]) && !fullDisplay && (
        <VerificationProcess onTabChange={onTabChange} activeTab={activeTab} />
      )}
      {permissions.includes(roleTypes[1]) && !fullDisplay && (
        <EnforcementProcess onTabChange={onTabChange} activeTab={activeTab} />
      )}
    </div>
  );
};

export default Enforcement;
