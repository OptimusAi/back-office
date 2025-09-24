import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { BackdropModal, Ribbon } from '@park-plus/ui';
import Header from './header';
import NavBar from './navbar';
import environment from '../../environments/environment';
import { useAuth } from './../authentication/authority';
import { useAccess } from 'react-redux-permission';
import keys from '../../languages/keys';
import { useBeforeunload } from 'react-beforeunload';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateAreas: `
      'header header'
      'nav content'`,
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto 1fr',
  },
  header: {
    gridArea: 'header',
  },
  nav: {
    gridArea: 'nav',
  },
  content: {
    gridArea: 'content',
    overflow: 'auto',
  },
}));

const Page = ({
  title,
  children,
  getClient,
  client,
  connected,
  permissions,
  activeInfraction,
  activeLicencePlateId,
  onClickAway,
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { definePermission, isLoaded } = useAccess();

  const intl = useIntl();
  const appTitle = () => {
    if (client === '' || undefined) {
      return `${title}`;
    }
    if (client.name) {
      return `${client.name} - ${title}`;
    }
  };

  useEffect(() => {
    if (client === '' && connected && isLoaded) {
      getClient(user.email);
    }

    if (!isLoaded && connected) {
      definePermission([...user.authorities]);
    }
  }, [
    getClient,
    user,
    client,
    connected,
    definePermission,
    isLoaded,
    permissions,
  ]);

  useBeforeunload((event) => {
    if (activeInfraction !== null || activeLicencePlateId !== null) {
      onClickAway();
    }
  });

  return (
    <div className={classes.container}>
      {!environment.production && <Ribbon text={environment.name} />}
      <Header
        title={appTitle()}
        className={classes.header}
        user={user}
        activeInfraction={activeInfraction}
        activeLicencePlateId={activeLicencePlateId}
        onClickAway={onClickAway}
      />
      <BackdropModal
        isActive={isLoaded && permissions.length === 0}
        message={intl.formatMessage({ id: keys.noUserRole })}
      />
      {isLoaded && permissions.length !== 0 && (
        <>
          <NavBar
            className={classes.nav}
            permissions={permissions}
            activeInfraction={activeInfraction}
            activeLicencePlateId={activeLicencePlateId}
            onClickAway={onClickAway}
          />
          <div className={classes.content}>{children}</div>
        </>
      )}
    </div>
  );
};

export default Page;
