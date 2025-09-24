import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@park-plus/ui';
import { configureApi } from '@park-plus/api';
import { PermissionProvider } from 'react-redux-permission';
import environment from './environments/environment';
import { getToken } from './app/authentication/authority';
import { permissionsReducer as permissions } from 'react-redux-permission';
import { APP_FEATURE_KEY, appReducer, connect } from './app/state/app.slice';
import {
  ENFORCEMENT_FEATURE_KEY,
  enforcementReducer,
} from './enforcement/state';
import { MANAGEMENT_FEATURE_KEY, managementReducer } from './management/state';
import { ADMIN_FEATURE_KEY, adminReducer } from './admin/state';
import App from './app';
import english from './languages/en-CA.js';
import french from './languages/fr-CA.js';

const PERMISSIONS_FEATURE_KEY = 'permissions';
const store = configureStore({
  reducer: {
    [APP_FEATURE_KEY]: appReducer,
    [ENFORCEMENT_FEATURE_KEY]: enforcementReducer,
    [MANAGEMENT_FEATURE_KEY]: managementReducer,
    [PERMISSIONS_FEATURE_KEY]: permissions,
    [ADMIN_FEATURE_KEY]: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: !environment.production,
  enhancers: [],
});

const bootstrap = () => {
  store.dispatch(connect());
};

const Main = () => {
  configureApi({ baseUrl: environment.apiBaseUrl, getToken });
  return (
    <Provider store={store}>
      <ThemeProvider>
        <IntlProvider
          locale={navigator.language}
          messages={navigator.language === 'fr' ? french : english}
        >
          <PermissionProvider store={store} reducerKey="permissions">
            <App onProtected={bootstrap} />
          </PermissionProvider>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(Main(), document.getElementById('root'));
