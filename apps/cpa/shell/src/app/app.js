import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Ribbon, Center, Logo } from '@park-plus/ui';

import environment from '../environments/environment';
import { routes } from '../routes';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%'
  },
}));

const Page = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      { !environment.production && <Ribbon text={environment.name} /> }
      {children}
    </div>
  );
};

const HomePage = () => (
  <Page>
    <Center>
      <Logo />
    </Center>
  </Page>
);

const Shell = () => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.home} component={HomePage} />
    </Switch>
  </BrowserRouter>
);

const App = () => (
  <Shell />
);

export default App;
