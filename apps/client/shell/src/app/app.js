import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Oops } from '@park-plus/ui';
import { Protect } from './authentication/authority';
import keys from '../languages/keys';
import { routes } from '../routes';
import Dashboard from '../dashboard';
import Enforcement from '../enforcement/enforcement.container';
import Management from '../management/management';
import Admin from '../admin/admin.container';
import Page from './page.container';
import ProtectedRoute from './authentication/protectedRoute';
import LogoutCallback from './authentication/logoutCallback';
import Logout from './authentication/logout';
import Callback from './authentication/callback';

const DashboardPage = (intl) => (
  <Page intl={intl} title={intl.formatMessage({ id: keys.dashboardTitle })}>
    <Dashboard />
  </Page>
);

const EnforcementPage = (intl) => {
  return (
    <Page intl={intl} title={intl.formatMessage({ id: keys.enforcementTitle })}>
      <Enforcement />
    </Page>
  );
};

const ZonesPage = (intl) => {
  return (
    <Page intl={intl} title={intl.formatMessage({ id: keys.zonesTitle })}>
      <Management />
    </Page>
  );
};

const AdminPage = (intl) => {
  return (
    <Page intl={intl} title={intl.formatMessage({ id: keys.adminTitle })}>
      <Admin />
    </Page>
  );
};

const Shell = ({ onProtected }) => {
  const intl = useIntl();
  return (
    <Protect onProtected={onProtected}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={routes.signin} component={Callback} />
          <Route exact={true} path={routes.logout} component={Logout} />
          <Route
            exact={true}
            path={routes.logoutCallback}
            component={LogoutCallback}
          />
          <ProtectedRoute
            path={routes.enforcement}
            component={() => EnforcementPage(intl)}
          />
          <ProtectedRoute
            path={routes.zones}
            component={() => ZonesPage(intl)}
          />
          <ProtectedRoute
            path={routes.admin}
            component={() => AdminPage(intl)}
          />
          <ProtectedRoute
            path={routes.dashboard}
            component={() => DashboardPage(intl)}
          />
        </Switch>
      </BrowserRouter>
    </Protect>
  );
};

const App = ({ error, onProtected, store }) => {
  return error ? <Oops /> : <Shell onProtected={onProtected} store={store} />;
};

export default App;
