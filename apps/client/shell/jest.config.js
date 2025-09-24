module.exports = {
  displayName: 'client-shell',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../test-results/apps/client/shell/coverage',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results/apps/client/shell',
    }]
  ],
  moduleNameMapper: {
    '.*authority(.*)$': '<rootDir>/src/app/authentication/fake-authority.js',
    '.*/api(.*)$': '<rootDir>/../../../libs/api/src/lib/fake-api.js',
  },
  globals: {
    ENV: {
      name: 'dev',
      appBaseUrl: 'http://localhost:4200',
      apiBaseUrl: 'https://parkplus.dev.parkpluslab.ca/api/',
      clientId: 'eps-client',
      cpaOauthBaseUrl: 'https://oauthuat.parkplus.ca',
      production: 'false',
    }
  }
};
