//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

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
  'setupFiles': [
    './jest.setup.mjs'
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
    '^.+\\.(?:js|mjs|ts|jsx|tsx)$': [
      'babel-jest',
      {
        'plugins': [
          '@emotion/babel-plugin',
          [
            'formatjs',
            {
              'ast': true,
              'idInterpolationPattern': '[sha512:contenthash:base64:6]'
            }
          ]
        ],
        'presets': [
          [
            '@babel/preset-env',
            {
              'targets': {
                'node': 'current'
              }
            }
          ],
          '@babel/preset-react',
          '@babel/preset-typescript',
          '@emotion/babel-preset-css-prop'
        ]
      }
    ]
  },
  'transformIgnorePatterns': [
    '/node_modules/(?!@fluentui)'
  ]
};
