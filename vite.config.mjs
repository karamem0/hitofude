//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import fs from 'fs';

import reactPlugin from '@vitejs/plugin-react';
import {
  defineConfig,
  loadEnv
} from 'vite';

const htmlPlugin = (env) => ({
  name: 'html-transform',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
  }
});

export default defineConfig(({ mode }) => ({
  'plugins': [
    reactPlugin({
      'babel': {
        'plugins': [
          '@emotion/babel-plugin',
          [
            'formatjs',
            {
              ast: true,
              idInterpolationPattern: '[sha512:contenthash:base64:6]'
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
  }
}));
