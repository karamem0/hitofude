export default {
  'automock': false,
  'coverageDirectory': 'coverage',
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'outputDirectory': 'test'
      }
    ]
  ],
  'snapshotSerializers': [
    '@emotion/jest/serializer'
  ],
  'testEnvironment': 'jsdom',
  'testMatch': [
    '**/*.test.ts',
    '**/*.test.tsx'
  ],
  'transform': {
    '^.+\\.(?:js|mjs|ts|jsx|tsx)$': 'babel-jest'
  },
  'transformIgnorePatterns': [
    '/node_modules/(?!@fluentui)'
  ]
};
