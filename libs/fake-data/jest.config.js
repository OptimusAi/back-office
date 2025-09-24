module.exports = {
  displayName: 'fake-data',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-results/libs/fake-data/coverage',
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: './test-results/libs/fake-data',
    } ]
  ]
};
