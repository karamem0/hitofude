//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  defineConfig,
  loadEnv
} from 'vite';
import fs from 'fs';
import reactPlugin from '@vitejs/plugin-react';

const htmlPlugin = (env) => ({
  name: 'html-transform',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
  }
});

export default defineConfig(({ mode }) => ({
  'build': {
    'outDir': 'build',
    'sourcemap': true
  },
  'optimizeDeps': {
    'esbuildOptions': {
      'define': {
        'global': 'globalThis'
      }
    }
  },
  'plugins': [
    reactPlugin({
      'babel': {
        'plugins': [
          '@emotion/babel-plugin',
          [
            'formatjs',
            {
              'ast': true,
              'idInterpolationPattern': '[sha512:contenthash:base64:6]'
            }
          ]
        ]
      },
      'jsxImportSource': '@emotion/react'
    }),
    htmlPlugin(loadEnv(mode, '.'))
  ],
  'server': {
    'https': {
      'cert': fs.readFileSync('./cert/localhost.crt'),
      'key': fs.readFileSync('./cert/localhost.key')
    }
  },
  'test': {
    'coverage': {
      'reporter': [
        'json'
      ],
      'reportsDirectory': './coverage'
    },
    'environment': 'jsdom',
    'globals': true,
    'outputFile': './test/junit.xml',
    'pool': 'threads',
    'setupFiles': [
      './vitest.setup.mjs'
    ]
  }
}));
