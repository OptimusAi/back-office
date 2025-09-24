import React, { Component } from 'react';
import {
  UserManager,
  WebStorageStateStore,
  getUserManager,
} from 'oidc-client';
import jwtDecode from 'jwt-decode';
import { post } from '@park-plus/api';
import environment from '../../environments/environment';

export const parkPlusClientKey = `park-plus.user:${environment.apiBaseUrl}authentication:${environment.clientId}`;

const oidcConfiguration = {
  authority: `${environment.cpaOauthBaseUrl}/oauth`,
  client_id: environment.clientId,
  redirect_uri: `${environment.appBaseUrl}/login/callback`,
  silent_redirect_uri: `${environment.appBaseUrl}/login/silent_callback`,
  response_type: 'token',
  scope: 'read write',
  loadUserInfo: false,
};

export const oidcMetadata = {
  authorization_endpoint: `${environment.cpaOauthBaseUrl}/oauth/authorize`,
  end_session_endpoint: `${environment.cpaOauthBaseUrl}/exit?redirect_uri=${environment.appBaseUrl}`,
};

const getParkPlusTokens = async (oidcUser) => {
  const response = await post('/token', {
    baseUrl: `${environment.apiBaseUrl}authentication`,
    getToken: async () => Promise.resolve(oidcUser.access_token),
  });
  if (response.ok) {
    await sessionStorage.setItem(
      parkPlusClientKey,
      JSON.stringify(response.data)
    );
  }
  return response.ok;
};

export default class AuthService {
  UserManager;
  constructor() {
    this.UserManager = new UserManager({
      ...oidcConfiguration,
      userStore: new WebStorageStateStore({ store: sessionStorage }),
      metadata: {
        ...oidcMetadata,
      },
    });

    this.UserManager.events.addUserLoaded((user) => {
      if (window.location.href.indexOf('login/callback') !== -1) {
        this.navigateToScreen();
      }
    });

    this.UserManager.events.addAccessTokenExpired(() => {
      this.logout();
    });

    this.getUser = this.getUser.bind(this);
  }

  signinRedirectCallback = () => {
    this.UserManager.signinRedirectCallback().then((user) => {
      return '';
    });
  };

  async getUser() {
    const user = await this.UserManager.getUser();
    if (!user) {
      return await this.UserManager.signinRedirectCallback();
    }
    return user;
  }

  signinRedirect = () => {
    localStorage.setItem('redirectUri', window.location.pathname);
    this.UserManager.signinRedirect({});
  };

  navigateToScreen = () => {
    window.location.replace('/');
  };

  isAuthenticated = () => {
    const oidcStorage = JSON.parse(
      sessionStorage.getItem(
        `oidc.user:${environment.cpaOauthBaseUrl}/oauth:${environment.clientId}`
      )
    );
    return !!oidcStorage && !!oidcStorage.access_token;
  };

  signinSilent = () => {
    this.UserManager.signinSilent()
      .then((user) => {
        console.log('signed in');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signinSilentCallback = () => {
    this.UserManager.signinSilentCallback();
  };

  createSigninRequest = () => {
    return this.UserManager.createSigninRequest();
  };

  logout = () => {
    this.UserManager.signoutRedirect();
    sessionStorage.removeItem(parkPlusClientKey);
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = () => {
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(environment.appBaseUrl);
    });
    this.UserManager.clearStaleState();
  };
}

const AuthContext = React.createContext({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  authService;
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  render() {
    return (
      <AuthContext.Provider value={this.authService}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Protect = ({
  children,
  onProtected = () => {
    /* do nothing */
  },
}) => (
  <AuthProvider>
    <AuthConsumer>
      {({ isAuthenticated, getUser }) => {
        if (isAuthenticated()) {
          getUser()
            .then(getParkPlusTokens)
            .then((ok) => {
              if (ok) onProtected();
            });
        }
        return children;
      }}
    </AuthConsumer>
  </AuthProvider>
);

const anonymousUser = { firstName: '?', lastName: '?' };

export const toUser = (oidcUser) => {
  const decoded = oidcUser ? jwtDecode(oidcUser.access_token) : anonymousUser;
  return {
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    email: decoded.email,
    authorities: decoded.authorities,
  };
};

const getParkPlusUser = () => {
  const item = sessionStorage.getItem(parkPlusClientKey);
  return item === 'null' ? null : JSON.parse(item);
};

export const getToken = async () => {
  const user = getParkPlusUser() ?? (await getUserManager().getUser());
  return user?.access_token ?? '';
};

export const useAuth = () => {
  const parkPlusUserFromToken = getParkPlusUser();
  const user = toUser(parkPlusUserFromToken);
  return {
    user,
  };
};
