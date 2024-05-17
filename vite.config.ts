//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import fs from 'fs';

import reactPlugin from '@vitejs/plugin-react';
import { defineConfig, loadEnv, Plugin } from 'vite';

export default defineConfig(({ mode }) => {

  const htmlPlugin = (env: ReturnType<typeof loadEnv>): Plugin => ({
    name: 'html-transform',
    transformIndexHtml: {
      order: 'pre',
      handler: (html: string): string => html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
    }
  });

  return {
    plugins: [
      reactPlugin({
        babel: {
          plugins: [
            '@emotion/babel-plugin',
            [
              'formatjs',
              {
                idInterpolationPattern: '[sha512:contenthash:base64:6]',
                ast: true
              }
            ]
          ]
        },
        jsxImportSource: '@emotion/react'
      }),
      htmlPlugin(loadEnv(mode, '.'))
    ],
    server: {
      https: {
        cert: fs.readFileSync('./cert/localhost.crt'),
        key: fs.readFileSync('./cert/localhost.key')
      }
    }
  };

});
