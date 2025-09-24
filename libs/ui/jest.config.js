module.exports = {
  displayName: 'ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../test-results/libs/ui/coverage',
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: './test-results/libs/ui',
    } ]
  ]
};
