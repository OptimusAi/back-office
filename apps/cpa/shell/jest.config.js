module.exports = {
  displayName: 'cpa-shell',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../test-results/apps/cpa/shell/coverage',
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: './test-results/apps/cpa/shell',
    } ]
  ],
};
